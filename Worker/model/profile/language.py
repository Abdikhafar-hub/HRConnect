from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, ForeignKey

class WorkerLanguage(db.Model, SerializerMixin):
    __tablename__ = 'worker_languages'
    serialize_rules = ('-worker.languages',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    language = Column(String(50), nullable=False)

    # relationship
    worker = db.relationship('Worker', backref='languages')

    def __repr__(self):
        return f"<WorkerLanguage {self.language} for Worker {self.worker_id}>"
