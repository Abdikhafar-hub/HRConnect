from flask_restful import Resource, reqparse
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from Worker.model.jobs.attendance import Attendance
from Worker.model.jobs.checkin_out import CheckInOutLog
from Worker.model.jobs.job_completion_log import JobCompletionLog
from Worker.model.jobs.contract import JobContract
from Worker.model.jobs.job_record import JobRecord
from Worker.model.jobs.job_request_log import JobRequestLog
from db import db
from datetime import datetime

# Parser for creating/updating jobs
job_parser = reqparse.RequestParser()
job_parser.add_argument('title', type=str, required=True)
job_parser.add_argument('description', type=str)
job_parser.add_argument('location', type=str)
job_parser.add_argument('wage', type=float, required=True)
job_parser.add_argument('currency', type=str, default='KES')

class WorkerJobListResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        jobs = JobRecord.query.filter_by(worker_id=worker_id).all()
        return jsonify([job.to_dict() for job in jobs])

class WorkerJobDetailResource(Resource):
    @jwt_required()
    def get(self, job_id):
        worker_id = get_jwt_identity()
        job = JobRecord.query.filter_by(id=job_id, worker_id=worker_id).first()
        if not job:
            return jsonify({'error': 'Job not found'}), 404
        return jsonify(job.to_dict())

class WorkerJobCheckInOutResource(Resource):
    @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('job_id', type=int, required=True)
        parser.add_argument('action', type=str, choices=('check_in', 'check_out'), required=True)
        parser.add_argument('method', type=str, default='manual')
        parser.add_argument('metadata', type=str)
        args = parser.parse_args()

        worker_id = get_jwt_identity()
        log = CheckInOutLog(
            worker_id=worker_id,
            job_id=args['job_id'],
            action=args['action'],
            method=args['method'],
            metadata=args['metadata']
        )
        db.session.add(log)
        db.session.commit()

        return jsonify({'message': f'{args["action"]} logged successfully'})

class WorkerJobCompletionResource(Resource):
    @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('job_id', type=int, required=True)
        parser.add_argument('notes', type=str)
        parser.add_argument('auto_flagged_late', type=bool, default=False)
        args = parser.parse_args()

        worker_id = get_jwt_identity()
        completion = JobCompletionLog(
            job_id=args['job_id'],
            worker_id=worker_id,
            confirmed_by='worker',
            completion_notes=args['notes'],
            auto_flagged_late=args['auto_flagged_late']
        )
        db.session.add(completion)
        db.session.commit()

        return jsonify({'message': 'Job marked as complete'})

class WorkerJobRequestLogResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        requests = JobRequestLog.query.filter_by(worker_id=worker_id).all()
        return jsonify([r.to_dict() for r in requests])

class WorkerJobContractListResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        contracts = JobContract.query.filter_by(worker_id=worker_id).all()
        return jsonify([c.to_dict() for c in contracts])

class WorkerAttendanceListResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        attendance = Attendance.query.filter_by(worker_id=worker_id).all()
        return jsonify([a.to_dict() for a in attendance])


# from Worker.routes.job_routes import (
#     WorkerJobListResource,
#     WorkerJobDetailResource,
#     WorkerJobCheckInOutResource,
#     WorkerJobCompletionResource,
#     WorkerJobRequestLogResource,
#     WorkerJobContractListResource,
#     WorkerAttendanceListResource
# )

# api.add_resource(WorkerJobListResource, '/api/worker/jobs')
# api.add_resource(WorkerJobDetailResource, '/api/worker/jobs/<int:job_id>')
# api.add_resource(WorkerJobCheckInOutResource, '/api/worker/jobs/check')
# api.add_resource(WorkerJobCompletionResource, '/api/worker/jobs/complete')
# api.add_resource(WorkerJobRequestLogResource, '/api/worker/jobs/requests')
# api.add_resource(WorkerJobContractListResource, '/api/worker/jobs/contracts')
# api.add_resource(WorkerAttendanceListResource, '/api/worker/jobs/attendance')
