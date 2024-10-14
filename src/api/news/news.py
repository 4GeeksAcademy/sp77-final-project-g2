import os
from . import news_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users
from newsapi import NewsApiClient
import requests


@news_bp.route('/news', methods=['GET'])
def news():
    response_body = {}
    # news_api_url = f'https://newsapi.org/v2/everything?q=keyword&apiKey={os.getenv("NEWS_API_KEY")}'
    news_api_url = f'https://newsapi.org/v2/top-headlines/sources?apiKey={os.getenv("NEWS_API_KEY")}'
    response = requests.get(news_api_url)
    news_data = response.json()

    articles = news_data.get('sources', [])[:5]
    response_body['message'] = f'Lista de headlines'
    response_body['news'] = articles
    return jsonify(response_body), 200
    