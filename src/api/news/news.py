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
    # Inicializar EventRegistry con la API Key desde el entorno
    er = EventRegistry(apiKey=os.getenv("NEWS_API_KEY"))

    # Obtener los parámetros de país y categoría de la URL
    country = request.args.get('country', '')  # Ej: "us"
    category = request.args.get('category', '')  # Ej: "technology"

    # Crear la consulta para EventRegistry
    q = QueryArticlesIter(
        dataType=["news"],  # Filtrar solo por noticias
        sourceLocationUri=er.getLocationUri(country) if country else None,  # Filtro por país
        categoryUri=er.getCategoryUri(category) if category else None  # Filtro por categoría
    )

    # Configurar lo que queremos obtener: título, imagen, fecha, descripción y categoría
    return_info = ReturnInfo(
        articleInfo=ArticleInfoFlags(
            bodyLen=200,  # Obtener una descripción corta del artículo (hasta 200 caracteres)
            categories=True,  # Incluir categorías del artículo
            image=True,  # Incluir imagen
        )
    )

    # Ejecutar la consulta y obtener los artículos
    articles = []
    for article in q.execQuery(er, sortBy="date", maxItems=10, returnInfo=return_info):
        categories = [category.get("label") for category in article.get("categories", [])]  # Obtener las categorías

        # Filtrar artículos que no tienen imagen o categoría
        if not article.get("image") or not categories:
            continue  # Saltar este artículo si no tiene imagen o categoría

        articles.append({
            "title": article.get("title"),
            "url": article.get("url"),
            "image": article.get("image"),
            "date": article.get("date"),
            "description": article.get("body", "")[:200],  # Descripción corta del artículo
            "categories": categories  # Categorías del artículo
        })

    # Crear la respuesta
    response_body = {
        "message": "Últimas noticias",
        "news": articles
    }

    return jsonify(response_body), 200
    