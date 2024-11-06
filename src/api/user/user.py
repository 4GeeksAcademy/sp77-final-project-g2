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
from werkzeug.security import generate_password_hash
from flask import current_app
from flask_mail import Message
import requests
import datetime

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
    
    # Validación de campos requeridos
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    
    if not all([email, password, first_name, last_name]):
        return jsonify({"message": "Todos los campos son obligatorios."}), 400

    existing_user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    if existing_user:
        return jsonify({"message": "El correo ya está registrado."}), 400

    hashed_password = generate_password_hash(password)
    
    row = Users(
        email=email,
        password=hashed_password,
        first_name=first_name,
        last_name=last_name,
        is_active=True,
        create_at=data.get('create_at', datetime.datetime.utcnow())
    )
    try:
        db.session.add(row)
        db.session.commit()
        print("Usuario guardado en la base de datos")
    except Exception as e:
        db.session.rollback()
        print(f"Error al guardar en la base de datos: {str(e)}")  # Mostrar el error en consola
        return jsonify({"message": f"Error al guardar el usuario: {str(e)}"}), 500

    # Generar token de acceso
    access_token = create_access_token(identity={'email': row.email, 'user_id': row.id})

    response_body['message'] = "Bienvenido/a a InnovAI"
    response_body['access_token'] = access_token
    response_body['results'] = row.serialize()  # Asumiendo que el método serialize existe en tu modelo
    return response_body, 200



@user_bp.route('/request-password-reset', methods=['POST'])
def request_password_reset():
    data = request.json
    email = data.get('email')
    user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()

    if not user:
        return jsonify({"message": "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña."}), 200

    # Generar el token de restablecimiento
    reset_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(minutes=15))
    send_reset_email(user.email, reset_token)  # Llamar a la función para enviar el correo

    return jsonify({"message": "Se ha enviado un enlace para restablecer tu contraseña"}), 200

def send_reset_email(email, token):
    # Construir el enlace de restablecimiento dinámicamente
    reset_url = f"http://localhost:3000/reset-password?token={token}"
    msg = Message(
        subject="Restablecimiento de Contraseña",
        recipients=[email],
        body=f"Para restablecer tu contraseña, haz clic en el siguiente enlace: {reset_url}"
    )
    # Enviar el correo usando el contexto de la app
    with current_app.app_context():
        current_app.extensions['mail'].send(msg)

@user_bp.route('/reset-password', methods=['POST'])
@jwt_required()
def reset_password():
    data = request.json
    new_password = data.get('password')
    user_id = get_jwt_identity()

    # Buscar el usuario y actualizar la contraseña
    user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
    user.password = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"message": "Contraseña actualizada con éxito"}), 200