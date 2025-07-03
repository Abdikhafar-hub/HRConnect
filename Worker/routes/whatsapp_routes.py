from flask import Blueprint, request, jsonify
from twilio.twiml.messaging_response import MessagingResponse
from Worker.model.auth.worker import Worker
from Worker.model.whatsapp.whatsappsession import WhatsAppSession
from Worker.model.jobs.job_record import JobRecord
from Worker.model.wallet.wallet import WorkerWallet
from db import db
import re

whatsapp_bp = Blueprint('whatsapp', __name__)

# Helper to send menu
def main_menu():
    return ("Welcome to WorkConnect Bot!\n"
            "1. View Jobs\n"
            "2. My Schedule\n"
            "3. Check In\n"
            "4. Check Out\n"
            "5. Wallet Balance\n"
            "6. Request Withdrawal\n"
            "7. Submit ID Documents\n"
            "Reply with the option number.")

@whatsapp_bp.route('/whatsapp/webhook', methods=['POST'])
def whatsapp_webhook():
    from_number = request.values.get('From', '')  # e.g. 'whatsapp:+2547...'
    body = request.values.get('Body', '').strip()
    # Normalize to phone only
    phone_match = re.search(r'\+\d+', from_number)
    phone = phone_match.group(0) if phone_match else from_number

    # Fetch or create session state
    session = WhatsAppSession.query.filter_by(phone=phone).first()
    if not session:
        session = WhatsAppSession(phone=phone, state='NEW')
        db.session.add(session)
        db.session.commit()

    resp = MessagingResponse()
    msg = resp.message()

    # New user: prompt PIN creation
    worker = Worker.query.filter_by(phone=phone).first()
    if session.state == 'NEW':
        msg.body("Welcome! Please set a 4-digit PIN to secure your account.")
        session.state = 'AWAIT_PIN_SETUP'
        db.session.commit()
        return str(resp)

    # PIN setup
    if session.state == 'AWAIT_PIN_SETUP':
        if re.fullmatch(r'\d{4}', body):
            if not worker:
                worker = Worker(phone=phone, pin=body)
                db.session.add(worker)
            else:
                worker.pin = body
            db.session.commit()
            session.state = 'AWAIT_PIN_AUTH'
            msg.body("PIN set successfully. Please enter your PIN to access the menu.")
        else:
            msg.body("Invalid PIN format. Send a 4-digit PIN to set.")
        db.session.commit()
        return str(resp)

    # PIN authentication
    if session.state in ['AWAIT_PIN_AUTH', 'AUTH_FAILED']:
        if worker and worker.pin and body == worker.pin:
            session.state = 'MAIN_MENU'
            db.session.commit()
            msg.body(main_menu())
        elif body.lower() == 'forgot':
            session.state = 'AWAIT_PIN_SETUP'
            msg.body("Please send a new 4-digit PIN to reset.")
        else:
            session.state = 'AUTH_FAILED'
            msg.body("Invalid PIN. Reply with your 4-digit PIN or type FORGOT to reset.")
        db.session.commit()
        return str(resp)

    # Main menu actions
    if session.state == 'MAIN_MENU':
        if body == '1':  # View Jobs
            jobs = JobRecord.query.filter_by(worker_id=worker.id, status='assigned').all()
            if not jobs:
                msg.body("No current job assignments.")
            else:
                response = "Your Jobs:\n"
                for j in jobs:
                    response += f"{j.id}. {j.title} - {j.status}\n"
                msg.body(response)
        elif body == '2':  # My Schedule
            jobs = JobRecord.query.filter_by(worker_id=worker.id).all()
            response = "Schedule:\n"
            for j in jobs:
                response += f"{j.id}. {j.title} on {j.started_at.date() if j.started_at else 'TBD'}\n"
            msg.body(response)
        elif body == '3':  # Check In
            msg.body("To check in, reply: CHECKIN <job_id>")
            session.state = 'AWAIT_CHECKIN'
        elif body == '4':  # Check Out
            msg.body("To check out, reply: CHECKOUT <job_id>")
            session.state = 'AWAIT_CHECKOUT'
        elif body == '5':  # Wallet Balance
            wallet = WorkerWallet.query.filter_by(worker_id=worker.id).first()
            bal = wallet.balance if wallet else 0.0
            pending = wallet.pending_balance() if wallet else 0.0
            msg.body(f"Balance: {bal}\nPending: {pending}")
        elif body == '6':  # Request Withdrawal
            msg.body("To request withdrawal, reply: WITHDRAW <amount> <channel> <destination>")
            session.state = 'AWAIT_WITHDRAW'
        elif body == '7':  # Submit ID
            msg.body("Please send your ID front image.")
            session.state = 'AWAIT_ID_FRONT'
        else:
            msg.body("Invalid option. " + main_menu())
        db.session.commit()
        return str(resp)

    # Check-in handler
    if session.state == 'AWAIT_CHECKIN' and body.lower().startswith('checkin'):
        parts = body.split()
        if len(parts) == 2 and parts[1].isdigit():
            # Log check-in logic here...
            msg.body(f"Checked in to job {parts[1]}")
            session.state = 'MAIN_MENU'
        else:
            msg.body("Invalid format. Use CHECKIN <job_id>")
        db.session.commit()
        return str(resp)

    # Check-out handler
    if session.state == 'AWAIT_CHECKOUT' and body.lower().startswith('checkout'):
        parts = body.split()
        if len(parts) == 2 and parts[1].isdigit():
            # Log check-out logic here...
            msg.body(f"Checked out of job {parts[1]}")
            session.state = 'MAIN_MENU'
        else:
            msg.body("Invalid format. Use CHECKOUT <job_id>")
        db.session.commit()
        return str(resp)

    # Withdrawal handler
    if session.state == 'AWAIT_WITHDRAW' and body.lower().startswith('withdraw'):
        parts = body.split()
        if len(parts) >= 4:
            # parse amount, channel, destination
            _, amount, channel, destination = parts[0], parts[1], parts[2], parts[3]
            # Withdrawal logic...
            msg.body(f"Withdrawal of {amount} via {channel} to {destination} requested.")
            session.state = 'MAIN_MENU'
        else:
            msg.body("Invalid format. Use WITHDRAW <amount> <channel> <destination>")
        db.session.commit()
        return str(resp)

    # ID submission handlers
    if session.state == 'AWAIT_ID_FRONT' and 'MediaUrl0' in request.values:
        # Save front image
        front_url = request.values.get('MediaUrl0')
        session.temp_id_front = front_url
        msg.body("Got front image. Now send back of your ID.")
        session.state = 'AWAIT_ID_BACK'
        db.session.commit()
        return str(resp)
    if session.state == 'AWAIT_ID_BACK' and 'MediaUrl0' in request.values:
        back_url = request.values.get('MediaUrl0')
        # Here save front and back to DB (WorkerIdentity)
        msg.body("ID images received and submitted for verification.")
        session.state = 'MAIN_MENU'
        db.session.commit()
        return str(resp)

    # Default fallback
    msg.body("Sorry, I didn't understand that. " + main_menu())
    db.session.commit()
    return str(resp)
