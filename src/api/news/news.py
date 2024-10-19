import os
from . import news_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users
from eventregistry import *
import requests


@news_bp.route('/news', methods=['GET'])
def get_news():
    er = EventRegistry(apiKey=os.getenv("NEWS_API_KEY"))

    # Obtener el parámetro de categoría de la URL
    category = request.args.get('category', None)  # Ej: "technology"

    # Si no se proporciona categoría, devolver noticias generales en inglés o español
    if not category:
        q = QueryArticlesIter(lang=["eng", "spa"], dataType=["news"])  # Filtro de idiomas
    else:
        category_uri = er.getCategoryUri(category)
        q = QueryArticlesIter(categoryUri=category_uri, lang=["eng", "spa"], dataType=["news"])  # Filtro de categoría e idiomas

    # Definir qué información se va a devolver
    return_info = ReturnInfo(
        articleInfo=ArticleInfoFlags(
            bodyLen=200,       # Longitud máxima del cuerpo de la noticia
            categories=True,   # Incluir categorías
            image=True,        # Incluir imágenes
            concepts=True,     # Incluir conceptos
        )
    )

    articles = []
    for article in q.execQuery(er, sortBy="date", maxItems=10, returnInfo=return_info):
        concepts = [concept.get("label").get("eng") for concept in article.get("concepts", [])]

        # Filtrar noticias que no tienen imagen o conceptos
        if not article.get("image") or not concepts:
            continue

        articles.append({
            "title": article.get("title"),
            "url": article.get("url"),
            "image": article.get("image"),
            "date": article.get("dateTimePub", ""),
            "description": article.get("body", "")[:200],  # Breve descripción
            "concepts": concepts,  # Conceptos asociados
            "source": article.get("source", {}).get("title", "Unknown Source")  # Fuente de la noticia
        })

    response_body = {
        "message": "Últimas noticias",
        "news": articles
    }

    return jsonify(response_body), 200

    