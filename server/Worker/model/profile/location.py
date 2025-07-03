from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, Float, ForeignKey

class WorkerLocation(db.Model, SerializerMixin):
    __tablename__ = 'worker_locations'
    serialize_rules = ('-worker.location',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False, unique=True)
    country = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False)
    area = Column(String(100))
    latitude = Column(Float)
    longitude = Column(Float)

    # relationship
    worker = db.relationship('Worker', backref='location', uselist=False)

    def __repr__(self):
        return f"<WorkerLocation {self.city}, {self.country} for Worker {self.worker_id}>"
