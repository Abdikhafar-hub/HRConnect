from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, DateTime, ForeignKey, String, Float
from datetime import datetime

class WorkerCheckIn(db.Model, SerializerMixin):
    __tablename__ = 'worker_checkins'
    serialize_rules = ('-worker.checkins',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    job_id = Column(Integer,
ForeignKey('job_records.id'

), nullable=False)
    checked_in_at = Column(DateTime, default=datetime.utcnow)
    checked_out_at = Column(DateTime)
    method = Column(String(20))  # 'GPS' or 'Manual'
    lateness_minutes = Column(Float)

    # relationship
    worker = db.relationship('Worker', backref='checkins')

    def __repr__(self):
        return f"<CheckIn Worker {self.worker_id} Job {self.job_id} at {self.checked_in_at}>"
