from flask_restful import Resource, reqparse
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from Worker.model.disputes.report import Report
from db import db
enum_valids = {"worker", "employer"}

# Parser for creating a report
treport_parser = reqparse.RequestParser()
treport_parser.add_argument('reported_user_id', type=int, required=False)
treport_parser.add_argument('reported_user_type', type=str, choices=('worker', 'employer'), required=False)
treport_parser.add_argument('job_id', type=int, required=False)
treport_parser.add_argument('category', type=str, choices=('JobRecord'

, 'user', 'system'), required=True)
treport_parser.add_argument('reason', type=str, required=True)
treport_parser.add_argument('description', type=str, required=False)
treport_parser.add_argument('image_url', type=str, required=False)

class WorkerReportListResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        reports = Report.query.filter_by(reporter_id=worker_id, reporter_type='worker').order_by(Report.submitted_at.desc()).all()
        return jsonify([r.to_dict() for r in reports])

class WorkerReportResource(Resource):
    @jwt_required()
    def get(self, report_id):
        worker_id = get_jwt_identity()
        report = Report.query.filter_by(id=report_id, reporter_id=worker_id, reporter_type='worker').first()
        if not report:
            return jsonify({'error': 'Report not found'}), 404
        return jsonify(report.to_dict())

class WorkerReportCreateResource(Resource):
    @jwt_required()
    def post(self):
        args = treport_parser.parse_args()
        worker_id = get_jwt_identity()
        report = Report(
            reporter_id=worker_id,
            reporter_type='worker',
            reported_user_id=args.get('reported_user_id'),
            reported_user_type=args.get('reported_user_type'),
            job_id=args.get('job_id'),
            category=args['category'],
            reason=args['reason'],
            description=args.get('description'),
            image_url=args.get('image_url')
        )
        db.session.add(report)
        db.session.commit()
        return jsonify({'message': 'Report submitted', 'report_id': report.id}), 201

# API Routes (to be added in your main setup)
# api.add_resource(WorkerReportListResource, '/reports')
# api.add_resource(WorkerReportResource, '/reports/<int:report_id>')
# api.add_resource(WorkerReportCreateResource, '/reports')
