from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from datetime import datetime

class Worker(db.Model, SerializerMixin):
    __tablename__ = 'workers'
    serialize_rules = ('-otps.worker', '-sessions.worker',)

    id = Column(Integer, primary_key=True)
    phone = Column(String(20), unique=True, nullable=False)
    preferred_language = Column(String(10), default='en')
    created_at = Column(DateTime, default=datetime.utcnow)
    is_verified = Column(Boolean, default=False)
    country_code = Column(String(5), default='KE')

    # relationships
    otps = db.relationship('OTP', back_populates='worker', cascade="all, delete-orphan")
    sessions = db.relationship('WorkerSession', back_populates='worker', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Worker {self.phone}>'
