from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class WhatsAppSession(db.Model, SerializerMixin):
    __tablename__ = 'whatsapp_sessions'
    serialize_rules = ('-id',)

    id = Column(Integer, primary_key=True)
    phone = Column(String(20), nullable=False, unique=True)

    # Optional link to Worker
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=True)
    worker = relationship('Worker', backref='whatsapp_sessions')

    state = Column(String(50), default='NEW')     # e.g. NEW, AWAIT_PIN_SETUP, MAIN_MENU, etc.
    temp_data = Column(Text, nullable=True)        # JSON blob or simple delimited data

    pin = Column(String(10), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<WhatsAppSession {self.phone} — state={self.state}>"
