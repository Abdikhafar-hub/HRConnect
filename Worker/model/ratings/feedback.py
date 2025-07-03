from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from datetime import datetime

class WorkerFeedback(db.Model, SerializerMixin):
    __tablename__ = 'worker_feedbacks'

    id = Column(Integer, primary_key=True)
    rating_id = Column(Integer, ForeignKey('worker_ratings.id'), nullable=False)
    commenter_type = Column(String(10), nullable=False)  # 'employer' or 'worker'
    comment_text = Column(Text, nullable=False)
    image_url = Column(String(255))  # optional link to attached image
    visible = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # relationship
    rating = db.relationship('WorkerRating', backref='feedbacks')

    def __repr__(self):
        return f"<Feedback by {self.commenter_type} on Rating {self.rating_id}>"
