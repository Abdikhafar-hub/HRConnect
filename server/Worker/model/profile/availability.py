from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, Time, ForeignKey

class WorkerAvailabilitySlot(db.Model, SerializerMixin):
    __tablename__ = 'worker_availability_slots'
    serialize_rules = ('-worker.availability_slots',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    day_of_week = Column(String(10), nullable=False)  # e.g., 'Monday'
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

    # relationship
    worker = db.relationship('Worker', backref='availability_slots')

    def __repr__(self):
        return f"<Availability on {self.day_of_week} from {self.start_time} to {self.end_time} for Worker {self.worker_id}>"
