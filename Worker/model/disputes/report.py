from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Enum
from datetime import datetime

class Report(db.Model, SerializerMixin):
    __tablename__ = 'reports'
    serialize_rules = ('-reporter.reports',)

    id = Column(Integer, primary_key=True)
    reporter_id = Column(Integer, nullable=False)  # Can be worker or employer
    reporter_type = Column(Enum('worker', 'employer', name='reporter_type'), nullable=False)

    reported_user_id = Column(Integer, nullable=True)  # Optional: if specific person is reported
    reported_user_type = Column(Enum('worker', 'employer', name='reported_user_type'), nullable=True)

    job_id = Column(Integer,
ForeignKey('job_records.id'

), nullable=True)  # Optional: if report is job-related
    category = Column(Enum('JobRecord'

, 'user', 'system', name='report_category'), nullable=False)
    reason = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(String(255), nullable=True)

    status = Column(Enum('pending', 'in_review', 'resolved', 'dismissed', name='report_status'), default='pending')
    submitted_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)
    resolved_by = Column(Integer, ForeignKey('admins.id'), nullable=True)  # Assuming an admin model exists

    # Relationships (if needed later)
    job = db.relationship('JobRecord'

, backref='reports', lazy=True)

    def __repr__(self):
        return f"<Report by {self.reporter_type} {self.reporter_id} | Category: {self.category} | Status: {self.status}>"
