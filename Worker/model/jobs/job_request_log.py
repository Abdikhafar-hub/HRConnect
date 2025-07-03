from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from datetime import datetime

class JobRequestLog(db.Model, SerializerMixin):
    __tablename__ = 'job_request_logs'
    serialize_rules = ('-worker.job_requests', '-job.request_logs')

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    job_id = Column(Integer,
ForeignKey('job_records.id'

), nullable=False)
    sent_via = Column(String(20))  # sms, whatsapp, in-app
    sent_at = Column(DateTime, default=datetime.utcnow)
    responded = Column(Boolean, default=False)
    response_status = Column(String(20), nullable=True)  # accepted, rejected, ignored
    responded_at = Column(DateTime, nullable=True)

    # relationships
    worker = db.relationship('Worker', backref='job_requests')
    job = db.relationship('JobRecord'

, backref='request_logs')

    def __repr__(self):
        return f"<JobRequestLog Worker {self.worker_id} → Job {self.job_id} [{self.response_status or 'pending'}]>"
