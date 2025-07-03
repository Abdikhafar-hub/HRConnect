from flask_restful import Resource, reqparse
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from Worker.model.availability.status import AvailabilityStatus
from Worker.model.availability.schedule import NotificationSchedule
from db import db
from datetime import datetime

# Parser for manual availability toggle
availability_parser = reqparse.RequestParser()
availability_parser.add_argument('is_available', type=bool, required=True, help='Availability status is required')

# Parser for scheduling notifications
schedule_parser = reqparse.RequestParser()
schedule_parser.add_argument('title', type=str, required=True, help='Title is required')
schedule_parser.add_argument('message', type=str, required=True, help='Message is required')
schedule_parser.add_argument('channel', type=str, choices=('in-app','sms','whatsapp'), default='in-app')
schedule_parser.add_argument('scheduled_for', type=lambda x: datetime.fromisoformat(x), required=True, help='Scheduled_for datetime in ISO format is required')

class AvailabilityStatusResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        status = AvailabilityStatus.query.filter_by(worker_id=worker_id).first()
        if not status:
            return jsonify({'is_available': False})
        return jsonify({'is_available': status.is_available, 'last_updated': status.last_updated.isoformat()})

    @jwt_required()
    def post(self):
        args = availability_parser.parse_args()
        worker_id = get_jwt_identity()
        status = AvailabilityStatus.query.filter_by(worker_id=worker_id).first()
        if not status:
            status = AvailabilityStatus(worker_id=worker_id, is_available=args['is_available'])
            db.session.add(status)
        else:
            status.is_available = args['is_available']
            status.last_updated = datetime.utcnow()
        db.session.commit()
        return jsonify({'message': 'Availability updated', 'is_available': status.is_available})

class NotificationScheduleListResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        schedules = NotificationSchedule.query.filter_by(worker_id=worker_id).all()
        return jsonify([s.to_dict() for s in schedules])

    @jwt_required()
    def post(self):
        args = schedule_parser.parse_args()
        worker_id = get_jwt_identity()
        sched = NotificationSchedule(
            worker_id=worker_id,
            title=args['title'],
            message=args['message'],
            channel=args['channel'],
            scheduled_for=args['scheduled_for']
        )
        db.session.add(sched)
        db.session.commit()
        return jsonify(sched.to_dict()), 201

# API Routes (to be added in main setup)
# api.add_resource(AvailabilityStatusResource, '/availability/status')
# api.add_resource(NotificationScheduleListResource, '/availability/schedule')
