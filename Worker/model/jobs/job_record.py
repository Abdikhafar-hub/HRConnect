from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Float
from datetime import datetime

class JobRecord(db.Model, SerializerMixin):
    __tablename__ = 'job_records'
    serialize_rules = ('-worker.jobs',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    employer_id = Column(Integer, nullable=False)
    job_id = Column(Integer, nullable=False)  # Links to job listing (external or employer module)
    title = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)
    location = Column(String(100), nullable=True)
    status = Column(Enum('assigned', 'in_progress', 'checked_out', 'completed', 'cancelled', name='job_status'), default='assigned')
    wage = Column(Float, nullable=False)
    currency = Column(String(10), default='KES')
    started_at = Column(DateTime, nullable=True)
    checked_out_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    worker = db.relationship('Worker', backref='jobs')

    def __repr__(self):
        return f"<JobRecord Worker {self.worker_id} | Job {self.title} | Status: {self.status}>"
