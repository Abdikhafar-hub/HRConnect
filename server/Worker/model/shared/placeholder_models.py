from db import db

class Employer(db.Model):
    __tablename__ = 'employers'
    id = db.Column(db.Integer, primary_key=True)

class Admin(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
