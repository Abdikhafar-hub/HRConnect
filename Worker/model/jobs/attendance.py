from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, DateTime, ForeignKey, String, Boolean, event, and_
from datetime import datetime
from Worker.model.jobs.checkin_out import CheckInOutLog

class Attendance(db.Model, SerializerMixin):
    __tablename__ = 'attendances'
    serialize_rules = ('-worker.attendance', '-job.attendance')

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    job_id = Column(Integer, ForeignKey('job_records.id'), nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    check_in_time = Column(DateTime, nullable=True)
    check_out_time = Column(DateTime, nullable=True)
    method = Column(String(20))  # 'gps', 'manual', 'admin'
    is_late = Column(Boolean, default=False)
    is_absent = Column(Boolean, default=False)

    # relationships
    worker = db.relationship('Worker', backref='attendance')
    job = db.relationship('JobRecord', backref='attendance')

    def __repr__(self):
        return f"<Attendance Worker {self.worker_id} for Job {self.job_id} on {self.date.date()}>"
