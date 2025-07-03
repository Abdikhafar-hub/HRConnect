from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey
from datetime import datetime

class WorkerNotificationPreference(db.Model, SerializerMixin):
    __tablename__ = 'worker_notification_preferences'
    serialize_rules = ('-worker.preferences',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False, unique=True)
    receive_sms = Column(Boolean, default=True)
    receive_whatsapp = Column(Boolean, default=True)
    receive_in_app = Column(Boolean, default=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    worker = db.relationship('Worker', backref='preferences', uselist=False)

    def __repr__(self):
        return f"<NotificationPreference for Worker {self.worker_id} | SMS: {self.receive_sms}, WhatsApp: {self.receive_whatsapp}, In-App: {self.receive_in_app}>"
