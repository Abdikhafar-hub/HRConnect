from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime

class ChatConversation(db.Model, SerializerMixin):
    __tablename__ = 'chat_conversations'

    id = Column(Integer, primary_key=True)
    job_id = Column(Integer,
ForeignKey('job_records.id'

), nullable=True)  # Optional: link to specific job
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    employer_id = Column(Integer, ForeignKey('employers.id'), nullable=False)
    started_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Conversation Worker {self.worker_id} <-> Employer {self.employer_id}>"
