from flask_restful import Resource, reqparse
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from Worker.model.chat.conversation import ChatConversation
from Worker.model.chat.message import ChatMessage
from Worker.model.auth.worker import Worker
#from model.employer import Employer
from db import db
from datetime import datetime

# ---------- PARSERS ----------
start_parser = reqparse.RequestParser()
start_parser.add_argument('employer_id', type=int, required=True)
start_parser.add_argument('job_id', type=int, required=False)

message_parser = reqparse.RequestParser()
message_parser.add_argument('conversation_id', type=int, required=True)
message_parser.add_argument('message', type=str, required=True)
message_parser.add_argument('sender_type', type=str, choices=('worker', 'employer'), required=True)
message_parser.add_argument('sender_id', type=int, required=True)
message_parser.add_argument('has_emoji', type=bool, default=False)
message_parser.add_argument('has_image', type=bool, default=False)

# ---------- RESOURCES ----------

class StartConversationResource(Resource):
    @jwt_required()
    def post(self):
        args = start_parser.parse_args()
        worker_id = get_jwt_identity()

        existing = ChatConversation.query.filter_by(worker_id=worker_id, employer_id=args['employer_id']).first()
        if existing:
            return jsonify({'message': 'Conversation already exists', 'conversation_id': existing.id})

        conversation = ChatConversation(
            worker_id=worker_id,
            employer_id=args['employer_id'],
            job_id=args['job_id']
        )
        db.session.add(conversation)
        db.session.commit()

        return jsonify({'message': 'Conversation started', 'conversation_id': conversation.id})


class SendMessageResource(Resource):
    @jwt_required()
    def post(self):
        args = message_parser.parse_args()
        message = ChatMessage(
            conversation_id=args['conversation_id'],
            sender_type=args['sender_type'],
            sender_id=args['sender_id'],
            message=args['message'],
            has_emoji=args['has_emoji'],
            has_image=args['has_image']
        )
        db.session.add(message)
        db.session.commit()
        return jsonify({'message': 'Message sent'})


class ConversationMessagesResource(Resource):
    @jwt_required()
    def get(self, conversation_id):
        messages = ChatMessage.query.filter_by(conversation_id=conversation_id).order_by(ChatMessage.timestamp.asc()).all()
        return jsonify([msg.to_dict() for msg in messages])


class MarkMessageReadResource(Resource):
    @jwt_required()
    def post(self, message_id):
        message = ChatMessage.query.get(message_id)
        if not message:
            return jsonify({'error': 'Message not found'}), 404
        message.is_read = True
        db.session.commit()
        return jsonify({'message': 'Marked as read'})


# api.add_resource(StartConversationResource, '/chat/start')
# api.add_resource(SendMessageResource, '/chat/send')
# api.add_resource(ConversationMessagesResource, '/chat/<int:conversation_id>/messages')
# api.add_resource(MarkMessageReadResource, '/chat/<int:message_id>/read')
