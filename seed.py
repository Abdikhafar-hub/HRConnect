from app import app
from db import db
from Worker.model.auth.worker import Worker
from Worker.model.auth.workersession import WorkerSession
from Worker.model.notifications.preference import WorkerNotificationPreference
from Worker.model.availability.status import AvailabilityStatus
from Worker.model.profile.location import WorkerLocation
from Worker.model.profile.identity import WorkerIdentity
from Worker.model.profile.language import WorkerLanguage
from Worker.model.whatsapp.whatsappsession import WhatsAppSession
from Worker.model.profile.skills import WorkerSkill
from Worker.model.wallet.wallet import WorkerWallet
from datetime import datetime

# Run under Flask app context
def seed_data():
    with app.app_context():
        # ❌ Drop all existing tables (dangerous in production!)
        db.drop_all()
        print("Dropped all tables.")
        # Create tables
        db.create_all()
        print("Recreated all tables.")

        # 1. Sample Worker
        phone = '+254700000000'
        worker = Worker.query.filter_by(phone=phone).first()
        if not worker:
            worker = Worker(phone=phone, is_verified=True)
            db.session.add(worker)
            db.session.commit()
            print(f"Created worker {worker.id} with phone {phone}")

            # ✅ Create WhatsApp session and pin
            session = WhatsAppSession(phone=phone, pin='1234', state='AWAIT_PIN_SETUP')
            db.session.add(session)
            print("Initialized WhatsApp session with PIN.")

        # 2. Notification Preferences
        prefs = WorkerNotificationPreference.query.filter_by(worker_id=worker.id).first()
        if not prefs:
            prefs = WorkerNotificationPreference(worker_id=worker.id)
            db.session.add(prefs)
            print("Created default notification preferences.")

        # 3. Availability Status
        status = AvailabilityStatus.query.filter_by(worker_id=worker.id).first()
        if not status:
            status = AvailabilityStatus(worker_id=worker.id, is_available=False, last_updated=datetime.utcnow())
            db.session.add(status)
            print("Initialized availability status.")

        # 4. Worker Location
        loc = WorkerLocation.query.filter_by(worker_id=worker.id).first()
        if not loc:
            loc = WorkerLocation(
                worker_id=worker.id,
                country='Kenya',
                city='Nairobi',
                area='CBD',
                latitude=-1.28333,
                longitude=36.81667
            )
            db.session.add(loc)
            print("Added sample location for worker.")

        # 5. Worker Identity
        identity = WorkerIdentity.query.filter_by(worker_id=worker.id).first()
        if not identity:
            identity = WorkerIdentity(
                worker_id=worker.id,
                national_id='12345678',
                tax_id='P1234567X',
                selfie_image=b'',
                id_image=b'',
                verified='pending',
                submitted_at=datetime.utcnow()
            )
            db.session.add(identity)
            print("Created worker identity record.")

        # 6. Languages & Skills
        existing_lang = WorkerLanguage.query.filter_by(worker_id=worker.id, language='English').first()
        if not existing_lang:
            lang = WorkerLanguage(worker_id=worker.id, language='English')
            db.session.add(lang)
            print("Added default language.")
        existing_skill = WorkerSkill.query.filter_by(worker_id=worker.id, skill_name='Cleaner').first()
        if not existing_skill:
            skill = WorkerSkill(worker_id=worker.id, skill_name='Cleaner')
            db.session.add(skill)
            print("Added default skill.")

        # 7. Wallet
        wallet = WorkerWallet.query.filter_by(worker_id=worker.id).first()
        if not wallet:
            wallet = WorkerWallet(worker_id=worker.id, balance=0.0, currency='KES', updated_at=datetime.utcnow())
            db.session.add(wallet)
            print("Initialized wallet for worker.")

        # Commit all
        db.session.commit()
        print("🔄 Seed data insertion complete.")

if __name__ == '__main__':
    seed_data()
