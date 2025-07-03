from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, DateTime, String, Boolean, ForeignKey
from datetime import datetime

class JobCompletionLog(db.Model, SerializerMixin):
    __tablename__ = 'job_completion_logs'
    serialize_rules = ('-worker.job_completions', '-job.completion_logs')

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    job_id = Column(Integer,
ForeignKey('job_records.id'

), nullable=False)
    confirmed_by = Column(String(20))  # worker, employer, system
    completion_notes = Column(String(255), nullable=True)
    completed_at = Column(DateTime, default=datetime.utcnow)
    auto_flagged_late = Column(Boolean, default=False)

    # relationships
    worker = db.relationship('Worker', backref='job_completions')
    job = db.relationship('JobRecord', backref='completion_logs')

    def __repr__(self):
        return f"<JobCompletionLog Job {self.job_id} | Confirmed by {self.confirmed_by}>"
