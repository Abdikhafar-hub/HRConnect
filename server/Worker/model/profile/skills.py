from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, ForeignKey

class WorkerSkill(db.Model, SerializerMixin):
    __tablename__ = 'worker_skills'
    serialize_rules = ('-worker.skills',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    skill_name = Column(String(100), nullable=False)

    # relationship
    worker = db.relationship('Worker', backref='skills')

    def __repr__(self):
        return f"<WorkerSkill {self.skill_name} for Worker {self.worker_id}>"
