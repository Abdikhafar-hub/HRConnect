from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime, timedelta

class OTP(db.Model, SerializerMixin):
    __tablename__ = 'otps'
    serialize_rules = ('-worker.otps',)

    id = Column(Integer, primary_key=True)
    phone = Column(String(20), nullable=False)
    code = Column(String(6), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, default=lambda: datetime.utcnow() + timedelta(minutes=5))
    worker_id = Column(Integer, ForeignKey('workers.id'))

    # relationship
    worker = db.relationship('Worker', back_populates='otps')

    def is_valid(self):
        return self.expires_at >= datetime.utcnow()

    def __repr__(self):
        return f'<OTP {self.code} for {self.phone}>'
