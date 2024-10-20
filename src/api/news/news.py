import os
from . import news_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users
from eventregistry import *
import requests

CORS(news_bp)

# @news_bp.route('/news', methods=['GET'])
# def get_news():
#     try:
#         # Obtener la API Key desde las variables de entorno
#         api_key = os.getenv("NEWS_API_KEY")
#         if not api_key:
#             return jsonify({"error": "API Key no configurada"}), 500

#         # Obtener el parámetro de 'category' desde la URL
#         category = request.args.get('category', None)
#         if not category:
#             return jsonify({"error": "Por favor, proporciona una categoría."}), 400

#         # Configurar Event Registry
#         er = EventRegistry(apiKey=api_key)

#         # Obtener el URI de la categoría
#         category_uri = er.getCategoryUri(category)

#         # Construir la consulta para obtener artículos en inglés o español y filtrar por categoría
#         q = QueryArticlesIter(
#             categoryUri=category_uri,
#             lang=["eng", "spa"],  # Solo mostrar artículos en inglés o español
#             dataType=["news"]
#         )

#         # Limitar los resultados a 10 artículos
#         articles = []
#         for article in q.execQuery(er, sortBy="date", sortByAsc=False, maxItems=10):
#             # Filtrar solo artículos que tengan imagen
#             if article.get("image"):
#                 articles.append({
#                     "title": article.get("title"),
#                     "url": article.get("url"),
#                     "image": article.get("image"),
#                     "date": article.get("date"),
#                     "description": article.get("body", "")[:200],  # Resumen de 200 caracteres
#                     "source": article.get("source", {}).get("title", "Unknown Source")
#                 })

#         return jsonify({"news": articles}), 200

#     except Exception as e:
#         # Capturar excepciones y devolver un error 500
#         return jsonify({"error": str(e)}), 500

@news_bp.route('/news', methods=['GET'])
def news():
    response_body = {}
    er = EventRegistry(apiKey=os.getenv("NEWS_API_KEY"))   

    category = request.args.get('category', None)
    category_uri = er.getCategoryUri(category)
    q = QueryArticlesIter(
        categoryUri=category_uri,
        lang=["eng", "spa"],
        dataType=['news'],
        isDuplicateFilter="skipDuplicates"
    )

    articles = []
    seen_titles = set()
    for article in q.execQuery(er, sortBy="date", sortByAsc=False, maxItems=12):
        title = article.get("title")
        if article.get("image") and title not in seen_titles:
            articles.append({"title": title,
                            "url": article.get("url"),
                            "image": article.get("image"),
                            "date": article.get("date"),
                            "description": article.get("body", "")[:130],
                            "source": article.get("source", {}).get("title", "Unknown Source")})
            seen_titles.add(title)

    response_body['message'] = f"Lista de Noticias por Categoría"
    response_body['news'] = articles
    return jsonify(response_body), 200