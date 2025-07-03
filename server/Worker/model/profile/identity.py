from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, LargeBinary
from datetime import datetime

class WorkerIdentity(db.Model, SerializerMixin):
    __tablename__ = 'worker_identities'
    serialize_rules = ('-worker.identity',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False, unique=True)
    national_id = Column(String(50), nullable=False)
    tax_id = Column(String(50))
    selfie_image = Column(LargeBinary)  # Store image directly
    id_image = Column(LargeBinary)      # Store national ID image
    verified = Column(String(20), default="pending")  # pending, verified, rejected
    submitted_at = Column(DateTime, default=datetime.utcnow)

    # relationship
    worker = db.relationship('Worker', backref='identity', uselist=False)

    def __repr__(self):
        return f"<WorkerIdentity for Worker {self.worker_id} - Status: {self.verified}>"
