"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from . import ideas_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, FavoriteIdeas
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from openai import OpenAI

CORS(ideas_bp)

@ideas_bp.route('/advisor', methods=['POST'])
def advisor():
    response_body = {}
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"),
                    organization=os.getenv("OPENAI_ORGANIZATION"),
                    project=os.getenv("OPENAI_PROJECT"))

    budget = request.json.get('budget')
    country = request.json.get('country')
    area = request.json.get('area')

    user_message = user_message = f"Tengo un presupuesto de {budget} euros, vivo en {country}, y me interesa el sector de {area}."
    response = client.chat.completions.create(
        model = "gpt-4o-mini",
        messages = [
            {"role": "system", 
            "content": ("Eres un consultor de negocios que genera ocho ideas de negocio en español. "
                        "Para cada idea, proporciona un título corto y una muy breve descripción. "
                        "No utilices números, listas, ni formato especial como negritas o asteriscos. "
                        "Usa 'Title:' seguido del nombre de la idea y 'Description:' seguido de la descripción de la idea.")},
            {"role": "user", "content": user_message}
        ],
        temperature = 0.7,
        max_completion_tokens = 500,
        n = 1)

    content = response.choices[0].message.content.strip()
    ideas = []
    for idea in content.split("Title:")[1:]:
        if "Description:" in idea:
            title, description = idea.split("Description:")
            title = title.replace("**", "").replace("\n", "").strip()
            description = description.replace("**", "").replace("\n", "").strip()
            ideas.append({"title": title,
                         "description": description})
    
    response_body['message'] = f"Ideas generadas para ti"
    response_body['ideas'] = ideas
    return response_body, 200

@ideas_bp.route('/favorite-ideas', methods=['POST'])
@jwt_required()
def add_favorite_idea():
    response_body = {}
    current_user = get_jwt_identity()
    user_id = current_user['user_id']
    data = request.json

    title = data.get('title')
    description = data.get('description')
    country = data.get('country')
    area = data.get('area')
    budget = data.get('budget')
    if not title or not description or not country or not area or not budget:
        return jsonify({"message": "Todos los campos son requeridos"}), 400

    new_favorite = FavoriteIdeas(title=title,
                                description=description,
                                country=country,
                                area=area,
                                budget=budget,
                                user_id=user_id)
    db.session.add(new_favorite)
    db.session.commit()

    response_body['message'] = "Idea favorita agregada exitosamente"
    response_body['favoriteIdea'] = new_favorite.serialize()
    return jsonify(response_body), 200

@ideas_bp.route('/favorite-ideas', methods=['GET'])
@jwt_required()
def get_favorite_ideas():
    current_user = get_jwt_identity()
    favorite_ideas = FavoriteIdeas.query.filter_by(user_id=current_user['user_id']).all()

    results = [idea.serialize() for idea in favorite_ideas]
    return jsonify({"results": results}), 200

