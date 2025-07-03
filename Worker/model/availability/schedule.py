from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from datetime import datetime

class NotificationSchedule(db.Model, SerializerMixin):
    __tablename__ = 'notification_schedules'
    serialize_rules = ('-worker.scheduled_notifications',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    title = Column(String(100), nullable=False)
    message = Column(String(255), nullable=False)
    channel = Column(String(20), default='in-app')  # in-app, sms, whatsapp
    scheduled_for = Column(DateTime, nullable=False)
    sent = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship
    worker = db.relationship('Worker', backref='scheduled_notifications')

    def __repr__(self):
        return f"<ScheduledNotification to Worker {self.worker_id} at {self.scheduled_for} | {self.channel}>"
