from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from datetime import datetime

class WorkerNotification(db.Model, SerializerMixin):
    __tablename__ = 'worker_notifications'
    serialize_rules = ('-worker.notifications',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    title = Column(String(100), nullable=False)
    message = Column(String(255), nullable=False)
    type = Column(String(50))  # e.g., job-alert, payment, admin
    channel = Column(String(20), default='in-app')  # in-app, sms, whatsapp
    is_read = Column(Boolean, default=False)
    sent_at = Column(DateTime, default=datetime.utcnow)
    scheduled_for = Column(DateTime, nullable=True)

    worker = db.relationship('Worker', backref='notifications')

    def __repr__(self):
        return f"<Notification to Worker {self.worker_id} - {self.title} ({self.channel})>"
