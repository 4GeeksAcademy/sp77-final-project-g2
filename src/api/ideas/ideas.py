"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from . import ideas_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Ideas, FavoriteIdeas
from openai import OpenAI

@ideas_bp.route('/advisor', methods=['POST'])
def advisor():
    response_body = {}
    client = OpenAI(
        api_key=os.getenv("OPENAI_API_KEY"),
        organization=os.getenv("OPENAI_ORGANIZATION"),
        project=os.getenv("OPENAI_PROJECT")
    )

    # budget = request.json.get('budget')
    # country = request.json.get('country')
    # area = request.json.get('area')

    user_message = request.json.get('message')

    response = client.chat.completions.create(
        model = "gpt-4o",
        messages = [
            {"role": "system",
            "content": "You are a business consultant who generates one business idea. The user will give you their budget, their country and the sector where they would like to start."},
            {"role": "user", "content": user_message}
        ],
        temperature = 1,
        max_completion_tokens = 250,
        n = 1,
        frequency_penalty=0,
        presence_penalty=0
    )

    ideas = response.choices[0].message.content.strip()
    response_body['message'] = f"Ideas generadas para ti"
    response_body['ideas'] = ideas
    return response_body, 200