"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from . import user_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, FavoriteIdeas
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import requests

CORS(user_bp)

@user_bp.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body["message"]= "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@user_bp.route('/users', methods=['GET'])
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    results = [row.serialize() for row in rows]

    response_body['message'] = f'Lista de Usuarios'
    response_body['results'] = results
    return response_body, 200


@user_bp.route('/login', methods=['POST'])
def login():
    response_body = {}
    data = request.json
    email = data.get('email', None)
    password = request.json.get('password', None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password)).scalar()
    if not user:
        response_body['message'] = f"Bad email or password"
        return response_body, 401
    access_token = create_access_token(identity = {'email': user.email, 'user_id': user.id})

    response_body['message'] = f'Hola de nuevo'
    response_body['access_token'] = access_token
    response_body['results'] = user.serialize()
    return response_body, 200

@user_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    response_body = {}
    current_user = get_jwt_identity()
    response_body['logged_in_as'] = current_user
    return response_body, 200

@user_bp.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    row = Users(email = data.get('email'),
                password = data.get('password'),
                first_name = data.get('first_name'),
                last_name = data.get('last_name'),
                is_active = True,
                create_at = data.get('create_at'))
    db.session.add(row)
    db.session.commit()

    response_body['message'] = f"Bienvenido/a a InnovAI"
    response_body['results'] = {}
    return response_body, 200