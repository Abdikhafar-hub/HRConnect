from flask_restful import Resource, reqparse
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from Worker.model.ratings.rating import WorkerRating
from Worker.model.ratings.feedback import WorkerFeedback
from db import db

# Parser for submitting feedback (worker replies)
feedback_parser = reqparse.RequestParser()
feedback_parser.add_argument('comment_text', type=str, required=True, help='Comment text is required')
feedback_parser.add_argument('image_url', type=str, required=False, help='Optional image URL')

class WorkerRatingListResource(Resource):
    @jwt_required()
    def get(self):
        # Returns all ratings for the logged-in worker
        worker_id = get_jwt_identity()
        ratings = WorkerRating.query.filter_by(worker_id=worker_id).order_by(WorkerRating.created_at.desc()).all()
        return jsonify([r.to_dict() for r in ratings])

class WorkerRatingDetailResource(Resource):
    @jwt_required()
    def get(self, rating_id):
        worker_id = get_jwt_identity()
        rating = WorkerRating.query.filter_by(id=rating_id, worker_id=worker_id).first()
        if not rating:
            return jsonify({'error': 'Rating not found'}), 404
        return jsonify(rating.to_dict())

class WorkerFeedbackListResource(Resource):
    @jwt_required()
    def get(self, rating_id):
        # Returns visible feedbacks for a specific rating
        feedbacks = WorkerFeedback.query.filter_by(rating_id=rating_id, visible=True).order_by(WorkerFeedback.created_at.asc()).all()
        return jsonify([f.to_dict() for f in feedbacks])

class WorkerFeedbackCreateResource(Resource):
    @jwt_required()
    def post(self, rating_id):
        # Worker replies to feedback
        worker_id = get_jwt_identity()
        rating = WorkerRating.query.get(rating_id)
        if not rating or rating.worker_id != worker_id:
            return jsonify({'error': 'Rating not found or access denied'}), 404

        args = feedback_parser.parse_args()
        feedback = WorkerFeedback(
            rating_id=rating_id,
            commenter_type='worker',
            comment_text=args['comment_text'],
            image_url=args.get('image_url'),
            visible=True
        )
        db.session.add(feedback)
        db.session.commit()
        return jsonify(feedback.to_dict()), 201

# API Routes (add when ready)
# api.add_resource(WorkerRatingListResource, '/ratings')
# api.add_resource(WorkerRatingDetailResource, '/ratings/<int:rating_id>')
# api.add_resource(WorkerFeedbackListResource, '/ratings/<int:rating_id>/feedbacks')
# api.add_resource(WorkerFeedbackCreateResource, '/ratings/<int:rating_id>/feedbacks')
