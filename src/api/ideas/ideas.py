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
import requests

@ideas_bp.route('/advisor', methods=['POST'])
def advisor():
    response_body = {}
    openai.api_key = os.getenv("OPENAI_API_KEY")

    # budget = request.json.get('budget')
    # country = request.json.get('country')
    # area = request.json.get('area')

    response = openai.ChatCompletion.create(
        model = "gpt-4o",
        messages = [
            {"role": "system",
            "content": [
                {"type": "text",
                "text": "You are a business consultant who generates one business idea. The user will give you their budget, their country and the sector where they would like to start."}
            ]}
        ],
        temperature = 1,
        max_completion_tokens = 250,
        n = 5,
        frequency_penalty=0,
        presence_penalty=0
    )

    ideas = [choice['message']['content'].strip() for choice in response['choices']]
    response_body['message'] = f"Ideas generadas para ti"
    response_body['ideas'] = ideas
    return response_body, 200


    