"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from . import user_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Ideas, FavoriteIdeas
from openai import OpenAI
import requests

@ideas_bp.route('/advisor', methods=['POST'])
def advisor():
    response_body = {}
    