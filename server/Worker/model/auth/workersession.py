from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime

class WorkerSession(db.Model, SerializerMixin):
    __tablename__ = 'worker_sessions'

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    device = Column(String(50))   # "Web", "WhatsApp", "USSD"
    location = Column(String(100))  # optional location (e.g. IP/city)
    logged_in_at = Column(DateTime, default=datetime.utcnow)

    # relationship
    worker = db.relationship('Worker', back_populates='sessions')

    def __repr__(self):
        return f'<Session for Worker {self.worker_id} on {self.device}>'
