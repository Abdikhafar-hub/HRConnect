from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from datetime import datetime

class ChatMessage(db.Model, SerializerMixin):
    __tablename__ = 'chat_messages'
    serialize_rules = ('-conversation.messages',)

    id = Column(Integer, primary_key=True)
    conversation_id = Column(Integer, ForeignKey('chat_conversations.id'), nullable=False)
    sender_type = Column(String(10))  # 'worker' or 'employer'
    sender_id = Column(Integer)       # worker_id or employer_id
    message = Column(String(500), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    is_read = Column(Boolean, default=False)
    has_emoji = Column(Boolean, default=False)
    has_image = Column(Boolean, default=False)

    # relationship
    conversation = db.relationship('ChatConversation', backref='messages')

    def __repr__(self):
        return f"<Message from {self.sender_type} {self.sender_id} at {self.timestamp}>"
