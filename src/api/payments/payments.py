import os
from . import payments_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

CORS(payments_bp)

@payments_bp.route('/checkout', methods=['POST'])
def checkout():
    response_body = {}