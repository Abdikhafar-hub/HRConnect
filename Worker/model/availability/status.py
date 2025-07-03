from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey, event
from datetime import datetime
from Worker.model.auth.workersession import WorkerSession

class AvailabilityStatus(db.Model, SerializerMixin):
    __tablename__ = 'availability_statuses'
    serialize_rules = ('-worker.availability_status',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False, unique=True)
    is_available = Column(Boolean, default=False)
    last_updated = Column(DateTime, default=datetime.utcnow)

    # relationship
    worker = db.relationship('Worker', backref='availability_status', uselist=False)

    def __repr__(self):
        return f"<AvailabilityStatus Worker {self.worker_id}: {'Available' if self.is_available else 'Unavailable'}>"

# Automatically mark worker as available on login
@event.listens_for(WorkerSession, 'after_insert')
def mark_worker_available(mapper, connection, target):
    availability_table = AvailabilityStatus.__table__
    now = datetime.utcnow()
    connection.execute(
        availability_table.insert()
        .values(worker_id=target.worker_id, is_available=True, last_updated=now)
        .on_conflict_do_update(
            index_elements=['worker_id'],
            set_={"is_available": True, "last_updated": now}
        )
    )
