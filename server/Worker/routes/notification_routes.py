from flask_restful import Resource, reqparse
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from Worker.model.notifications.preference import WorkerNotificationPreference
from Worker.model.notifications.notification import WorkerNotification
from db import db

# Parser for updating notification preferences
prefs_parser = reqparse.RequestParser()
prefs_parser.add_argument('receive_sms', type=bool, required=False)
prefs_parser.add_argument('receive_whatsapp', type=bool, required=False)
prefs_parser.add_argument('receive_in_app', type=bool, required=False)

class NotificationListResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        notifications = WorkerNotification.query.filter_by(worker_id=worker_id).order_by(WorkerNotification.sent_at.desc()).all()
        return jsonify([n.to_dict() for n in notifications])

class NotificationReadResource(Resource):
    @jwt_required()
    def post(self, notification_id):
        worker_id = get_jwt_identity()
        notif = WorkerNotification.query.filter_by(id=notification_id, worker_id=worker_id).first()
        if not notif:
            return jsonify({'error': 'Notification not found'}), 404
        notif.is_read = True
        db.session.commit()
        return jsonify({'message': 'Notification marked as read'})

class NotificationPreferenceResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        prefs = WorkerNotificationPreference.query.filter_by(worker_id=worker_id).first()
        if not prefs:
            prefs = WorkerNotificationPreference(worker_id=worker_id)
            db.session.add(prefs)
            db.session.commit()
        return jsonify(prefs.to_dict())

    @jwt_required()
    def put(self):
        worker_id = get_jwt_identity()
        prefs = WorkerNotificationPreference.query.filter_by(worker_id=worker_id).first()
        if not prefs:
            return jsonify({'error': 'Preferences not found'}), 404
        args = prefs_parser.parse_args()
        for field in ['receive_sms', 'receive_whatsapp', 'receive_in_app']:
            if args[field] is not None:
                setattr(prefs, field, args[field])
        db.session.commit()
        return jsonify({'message': 'Preferences updated', 'preferences': prefs.to_dict()})

# API Routes (commented out)
# api.add_resource(NotificationListResource, '/notifications')
# api.add_resource(NotificationReadResource, '/notifications/<int:notification_id>/read')
# api.add_resource(NotificationPreferenceResource, '/notifications/preferences')
