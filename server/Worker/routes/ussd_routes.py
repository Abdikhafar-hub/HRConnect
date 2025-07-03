from flask import Blueprint, request, Response
from Worker.model.auth.worker import Worker
from Worker.model.jobs.job_record import JobRecord
from Worker.model.wallet.wallet import WorkerWallet
from Worker.model.wallet.wallet import WorkerWallet as WalletModel
from Worker.model.profile.identity import WorkerIdentity
from db import db
import os

ussd_bp = Blueprint('ussd', __name__)

# USSD handler for Safaricom-style sessions
@ussd_bp.route('/ussd', methods=['POST'])
def ussd_handler():
    session_id = request.values.get('sessionId')
    service_code = request.values.get('serviceCode')
    phone = request.values.get('phoneNumber')
    text = request.values.get('text', '')  # e.g. '', '1', '6*2*500'

    # Normalize phone to match worker records
    worker = Worker.query.filter_by(phone=phone).first()
    if not worker:
        # If no worker, end session
        return Response('END You are not registered. Please sign up via the app.', mimetype='text/plain')

    parts = text.split('*') if text else []

    # Main menu
    if text == '':
        response = "CON Welcome to WorkConnect USSD\n"
        response += "1. View Jobs\n"
        response += "2. My Schedule\n"
        response += "3. Check In (3*<job_id>)\n"
        response += "4. Check Out (4*<job_id>)\n"
        response += "5. Wallet Balance\n"
        response += "6. Withdraw Funds\n"
        response += "7. Submit ID\n"
        return Response(response, mimetype='text/plain')

    # View Jobs
    if parts[0] == '1':
        jobs = JobRecord.query.filter_by(worker_id=worker.id, status='assigned').all()
        if not jobs:
            return Response('END No current job assignments.', mimetype='text/plain')
        resp = "CON Your Jobs:\n"
        for j in jobs:
            resp += f"{j.id}. {j.title} ({j.status})\n"
        resp += "\nReply with 3*<job_id> to check in or 4*<job_id> to check out."
        return Response(resp, mimetype='text/plain')

    # My Schedule
    if parts[0] == '2':
        jobs = JobRecord.query.filter_by(worker_id=worker.id).all()
        if not jobs:
            return Response('END No scheduled jobs found.', mimetype='text/plain')
        resp = "END Schedule:\n"
        for j in jobs:
            date = j.started_at.date() if j.started_at else 'TBD'
            resp += f"{j.id}. {j.title} on {date}\n"
        return Response(resp, mimetype='text/plain')

    # Check In
    if parts[0] == '3' and len(parts) == 2 and parts[1].isdigit():
        job_id = int(parts[1])
        # TODO: insert CheckInOutLog for check_in here
        return Response(f'END Checked in to job {job_id}.', mimetype='text/plain')

    # Check Out
    if parts[0] == '4' and len(parts) == 2 and parts[1].isdigit():
        job_id = int(parts[1])
        # TODO: insert CheckInOutLog for check_out here
        return Response(f'END Checked out of job {job_id}.', mimetype='text/plain')

    # Wallet Balance
    if parts[0] == '5':
        wallet = WorkerWallet.query.filter_by(worker_id=worker.id).first()
        bal = wallet.balance if wallet else 0.0
        pending = wallet.pending_balance() if wallet else 0.0
        return Response(f'END Balance: {bal} {wallet.currency if wallet else "KES"}\nPending: {pending}', mimetype='text/plain')

    # Withdraw Funds: Step 1 show methods
    if parts[0] == '6' and len(parts) == 1:
        methods = worker.wallet.get_available_payment_methods()
        if not methods:
            return Response('END No withdrawal methods available.', mimetype='text/plain')
        resp = 'CON Select method:\n'
        for idx, m in enumerate(methods, start=1):
            resp += f"{idx}. {m}\n"
        resp += '\nThen reply: 6*<method_number>*<amount>'
        return Response(resp, mimetype='text/plain')

    # Withdraw Funds: Step 2 execute
    if parts[0] == '6' and len(parts) == 3 and parts[1].isdigit():
        methods = worker.wallet.get_available_payment_methods()
        idx = int(parts[1]) - 1
        if idx < 0 or idx >= len(methods):
            return Response('END Invalid method selection.', mimetype='text/plain')
        try:
            amount = float(parts[2])
        except ValueError:
            return Response('END Invalid amount.', mimetype='text/plain')
        method = methods[idx]
        try:
            txn = worker.wallet.initiate_withdrawal(amount, method)
            return Response(f'END Withdrawal of {amount} via {method} requested.', mimetype='text/plain')
        except Exception as e:
            return Response(f'END {str(e)}', mimetype='text/plain')

    # Submit ID
    if parts[0] == '7':
        # mark pending
        identity = WorkerIdentity.query.filter_by(worker_id=worker.id).first()
        if identity:
            identity.verified = 'pending'
        else:
            identity = WorkerIdentity(worker_id=worker.id, national_id='', selfie_image=b'', id_image=b'', verified='pending')
            db.session.add(identity)
        db.session.commit()
        # send SMS reminder (optional)
        # TODO: integrate SMS API
        return Response('END ID marked pending. Please upload via the app or WhatsApp bot.', mimetype='text/plain')

    # Fallback
    return Response('END Invalid option. Please try again.', mimetype='text/plain')
