from flask_restful import Resource, reqparse
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from Worker.model.profile.availability import WorkerAvailabilitySlot
from Worker.model.profile.check_in import WorkerCheckIn
from Worker.model.profile.identity import WorkerIdentity
from Worker.model.profile.language import WorkerLanguage
from Worker.model.profile.location import WorkerLocation
from Worker.model.profile.skills import WorkerSkill
from db import db
from datetime import datetime

# Parsers
availability_parser = reqparse.RequestParser()
availability_parser.add_argument('day_of_week', type=str, required=True, help='Day is required')
availability_parser.add_argument('start_time', type=str, required=True, help='Start time is required in HH:MM format')
availability_parser.add_argument('end_time', type=str, required=True, help='End time is required in HH:MM format')

identity_parser = reqparse.RequestParser()
identity_parser.add_argument('national_id', type=str, required=True)
identity_parser.add_argument('tax_id', type=str)
identity_parser.add_argument('selfie_image', type=bytes, required=True)
identity_parser.add_argument('id_image', type=bytes, required=True)

language_parser = reqparse.RequestParser()
language_parser.add_argument('language', type=str, required=True)

location_parser = reqparse.RequestParser()
location_parser.add_argument('country', type=str, required=True)
location_parser.add_argument('city', type=str, required=True)
location_parser.add_argument('area', type=str)
location_parser.add_argument('latitude', type=float)
location_parser.add_argument('longitude', type=float)

skill_parser = reqparse.RequestParser()
skill_parser.add_argument('skill_name', type=str, required=True)

class AvailabilitySlotListResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        slots = WorkerAvailabilitySlot.query.filter_by(worker_id=worker_id).all()
        return jsonify([s.to_dict() for s in slots])

    @jwt_required()
    def post(self):
        args = availability_parser.parse_args()
        worker_id = get_jwt_identity()
        slot = WorkerAvailabilitySlot(
            worker_id=worker_id,
            day_of_week=args['day_of_week'],
            start_time=datetime.strptime(args['start_time'], '%H:%M').time(),
            end_time=datetime.strptime(args['end_time'], '%H:%M').time()
        )
        db.session.add(slot)
        db.session.commit()
        return jsonify(slot.to_dict()), 201

class CheckInListResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        checks = WorkerCheckIn.query.filter_by(worker_id=worker_id).all()
        return jsonify([c.to_dict() for c in checks])

class IdentityResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        identity = WorkerIdentity.query.filter_by(worker_id=worker_id).first()
        if not identity:
            return jsonify({'message': 'No identity on file'}), 404
        return jsonify(identity.to_dict())

    @jwt_required()
    def post(self):
        args = identity_parser.parse_args()
        worker_id = get_jwt_identity()
        identity = WorkerIdentity(
            worker_id=worker_id,
            national_id=args['national_id'],
            tax_id=args.get('tax_id'),
            selfie_image=args['selfie_image'],
            id_image=args['id_image']
        )
        db.session.add(identity)
        db.session.commit()
        return jsonify(identity.to_dict()), 201

class LanguageListResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        langs = WorkerLanguage.query.filter_by(worker_id=worker_id).all()
        return jsonify([l.to_dict() for l in langs])

    @jwt_required()
    def post(self):
        args = language_parser.parse_args()
        worker_id = get_jwt_identity()
        lang = WorkerLanguage(worker_id=worker_id, language=args['language'])
        db.session.add(lang)
        db.session.commit()
        return jsonify(lang.to_dict()), 201

class LocationResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        loc = WorkerLocation.query.filter_by(worker_id=worker_id).first()
        if not loc:
            return jsonify({'message': 'No location set'}), 404
        return jsonify(loc.to_dict())

    @jwt_required()
    def post(self):
        args = location_parser.parse_args()
        worker_id = get_jwt_identity()
        loc = WorkerLocation(
            worker_id=worker_id,
            country=args['country'],
            city=args['city'],
            area=args.get('area'),
            latitude=args.get('latitude'),
            longitude=args.get('longitude')
        )
        db.session.add(loc)
        db.session.commit()
        return jsonify(loc.to_dict()), 201

class SkillListResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        skills = WorkerSkill.query.filter_by(worker_id=worker_id).all()
        return jsonify([s.to_dict() for s in skills])

    @jwt_required()
    def post(self):
        args = skill_parser.parse_args()
        worker_id = get_jwt_identity()
        skill = WorkerSkill(worker_id=worker_id, skill_name=args['skill_name'])
        db.session.add(skill)
        db.session.commit()
        return jsonify(skill.to_dict()), 201

def register_profile_routes(api):
        api.add_resource(AvailabilitySlotListResource, '/profile/availability')
        api.add_resource(CheckInListResource, '/profile/checkins')
        api.add_resource(IdentityResource, '/profile/identity')
        api.add_resource(LanguageListResource, '/profile/languages')
        api.add_resource(LocationResource, '/profile/location')
        api.add_resource(SkillListResource, '/profile/skills')
