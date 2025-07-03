from flask import Blueprint, request, jsonify
from Worker.model.auth.worker import Worker
from Worker.model.auth.otp import OTP
from Worker.model.auth.workersession import WorkerSession
from db import db
import random
from datetime import datetime, timedelta
from twilio.rest import Client
import os

# Twilio config (make sure to store these securely)
TWILIO_SID = os.getenv('TWILIO_SID')
TWILIO_TOKEN = os.getenv('TWILIO_TOKEN')
TWILIO_PHONE = os.getenv('TWILIO_PHONE')
client = Client(TWILIO_SID, TWILIO_TOKEN)

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/worker/login', methods=['POST'])
def worker_login():
    data = request.json
    phone = data.get('phone')
    language = data.get('language')

    if not phone:
        return jsonify({'error': 'Phone number is required'}), 400

    otp_code = str(random.randint(100000, 999999))
    otp = OTP(phone=phone, code=otp_code, expires_at=datetime.utcnow() + timedelta(minutes=5))
    db.session.add(otp)
    db.session.commit()

    try:
        message = client.messages.create(
            body=f"Your verification code is {otp_code}",
            from_=TWILIO_PHONE,
            to=phone
        )
        return jsonify({'message': 'OTP sent successfully'}), 200
    except Exception as e:
        return jsonify({'error': 'Failed to send OTP', 'details': str(e)}), 500

@auth_bp.route('/worker/verify', methods=['POST'])
def verify_otp():
    data = request.json
    phone = data.get('phone')
    code = data.get('code')

    otp = OTP.query.filter_by(phone=phone, code=code).first()
    if not otp or otp.expires_at < datetime.utcnow():
        return jsonify({'error': 'Invalid or expired OTP'}), 400

    worker = Worker.query.filter_by(phone=phone).first()
    if not worker:
        worker = Worker(phone=phone, verified=True)
        db.session.add(worker)
    else:
        worker.verified = True

    db.session.delete(otp)
    db.session.commit()

    return jsonify({'message': 'Phone verified', 'worker_id': worker.id}), 200

@auth_bp.route('/worker/session', methods=['POST'])
def create_session():
    data = request.json
    worker_id = data.get('worker_id')

    session = WorkerSession(worker_id=worker_id, login_time=datetime.utcnow())
    db.session.add(session)

    worker = Worker.query.get(worker_id)
    worker.is_available = True

    db.session.commit()
    return jsonify({'message': 'Session created, worker available'}), 200

@auth_bp.route('/worker/logout', methods=['POST'])
def logout():
    data = request.json
    worker_id = data.get('worker_id')

    session = WorkerSession.query.filter_by(worker_id=worker_id).order_by(WorkerSession.login_time.desc()).first()
    if session:
        session.logout_time = datetime.utcnow()

    worker = Worker.query.get(worker_id)
    worker.is_available = False

    db.session.commit()
    return jsonify({'message': 'Worker logged out'}), 200

@auth_bp.route('/worker/resend_otp', methods=['POST'])
def resend_otp():
    data = request.json
    phone = data.get('phone')

    otp_code = str(random.randint(100000, 999999))
    otp = OTP(phone=phone, code=otp_code, expires_at=datetime.utcnow() + timedelta(minutes=5))
    db.session.add(otp)
    db.session.commit()

    try:
        message = client.messages.create(
            body=f"Your verification code is {otp_code}",
            from_=TWILIO_PHONE,
            to=phone
        )
        return jsonify({'message': 'OTP re-sent successfully'}), 200
    except Exception as e:
        return jsonify({'error': 'Failed to resend OTP', 'details': str(e)}), 500
