from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, DateTime, ForeignKey, Enum, String, event, and_
from datetime import datetime


class CheckInOutLog(db.Model, SerializerMixin):
    __tablename__ = 'checkinout_logs'
    serialize_rules = ('-worker.checkin_outs',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    job_id = Column(Integer, nullable=False)
    action = Column(Enum('check_in', 'check_out', name='check_action'), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    method = Column(String(20), default='manual')
    details = Column(String(255), nullable=True)

    worker = db.relationship('Worker', backref='check_logs')

    def __repr__(self):
        return f"<CheckLog Worker {self.worker_id} | Job {self.job_id} | {self.action} at {self.timestamp}>"


@event.listens_for(CheckInOutLog, 'after_insert')
def sync_attendance(mapper, connection, target):
    from Worker.model.jobs.attendance import Attendance  # ✅ Moved inside to avoid circular import
    attendance_table = Attendance.__table__
    today = target.timestamp.date()

    stmt = attendance_table.select().where(
        and_(
            attendance_table.c.worker_id == target.worker_id,
            attendance_table.c.job_id == target.job_id,
            attendance_table.c.date == today
        )
    )
    result = connection.execute(stmt).fetchone()

    if target.action == 'check_in':
        if result:
            connection.execute(
                attendance_table.update()
                .where(attendance_table.c.id == result.id)
                .values(check_in_time=target.timestamp, method=target.method)
            )
        else:
            connection.execute(
                attendance_table.insert().values(
                    worker_id=target.worker_id,
                    job_id=target.job_id,
                    date=today,
                    check_in_time=target.timestamp,
                    method=target.method
                )
            )

    elif target.action == 'check_out':
        if result:
            connection.execute(
                attendance_table.update()
                .where(attendance_table.c.id == result.id)
                .values(check_out_time=target.timestamp)
            )
        else:
            connection.execute(
                attendance_table.insert().values(
                    worker_id=target.worker_id,
                    job_id=target.job_id,
                    date=today,
                    check_out_time=target.timestamp
                )
            )
