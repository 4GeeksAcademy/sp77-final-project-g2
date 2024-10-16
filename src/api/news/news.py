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

    articles_api_url = f'https://newsapi.org/v2/top-headlines?country=us&apiKey={os.getenv("NEWS_API_KEY")}'
    articles_response = requests.get(articles_api_url)
    news_data = articles_response.json()
    articles = news_data.get('articles', [])[:50]


    sources_api_url = f'https://newsapi.org/v2/top-headlines/sources?apiKey={os.getenv("NEWS_API_KEY")}'
    sources_response = requests.get(sources_api_url)
    sources_data = sources_response.json()

    for article in articles:
        for source in sources_data['sources']:
            if article['source']['id'] == source['id']:
                article['category'] = source['category']

    filtered_articles = [
        article for article in articles
        if article.get('urlToImage') and article.get('category')
        ]

    response_body['message'] = f'Lista de headlines'
    response_body['news'] = filtered_articles
    return jsonify(response_body), 200
    