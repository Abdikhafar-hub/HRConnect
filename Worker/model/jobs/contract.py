from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Enum
from datetime import datetime

class JobContract(db.Model, SerializerMixin):
    __tablename__ = 'job_contracts'
    serialize_rules = ('-worker.contracts', '-employer.contracts')

    id = Column(Integer, primary_key=True)
    job_id = Column(Integer,
ForeignKey('job_records.id'

), nullable=False)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    employer_id = Column(Integer, ForeignKey('employers.id'), nullable=False)

    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=True)
    terms = Column(String(500), nullable=True)
    agreed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(Enum('pending', 'active', 'completed', 'terminated', name='contract_status'), default='pending')

    # relationships
    worker = db.relationship('Worker', backref='contracts')
    employer = db.relationship('Employer', backref='contracts')
    job = db.relationship('JobRecord', backref='contract', uselist=False)

    def __repr__(self):
        return f"<Contract Job {self.job_id} | Worker {self.worker_id} | Status {self.status}>"
