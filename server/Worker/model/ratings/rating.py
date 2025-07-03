from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from datetime import datetime

class WorkerRating(db.Model, SerializerMixin):
    __tablename__ = 'worker_ratings'
    serialize_rules = ('-worker.ratings',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    employer_id = Column(Integer, ForeignKey('employers.id'), nullable=False)
    job_id = Column(Integer,
ForeignKey('job_records.id'

), nullable=False)
    rating = Column(Float, nullable=False)  # 1.0 to 5.0
    feedback = Column(String(255))  # optional structured feedback string
    created_at = Column(DateTime, default=datetime.utcnow)

    # relationship
    worker = db.relationship('Worker', backref='ratings')

    def __repr__(self):
        return f"<Rating {self.rating} for Worker {self.worker_id} by Employer {self.employer_id}>"
