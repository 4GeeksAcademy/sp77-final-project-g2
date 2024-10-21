import os
from . import converter_bp
from flask import Flask, request, jsonify
from flask_cors import CORS
from api.models import db, Users, Ideas, FavoriteIdeas
import requests

CORS(converter_bp)

@converter_bp.route('/converter', methods=['GET'])
def converter():
    response_body = {}
    apiKey = os.getenv("CONVERTER_API_KEY")

    from_currency = request.args.get('from_currency')
    to_currency = request.args.get('to_currency')
    amount = request.args.get('amount')

    url = f"https://v6.exchangerate-api.com/v6/{apiKey}/pair/{from_currency}/{to_currency}/{amount}"
    response = requests.get(url)
    data = response.json()

    response_body['message'] = "Conversión de Divisas"
    response_body['from_currency'] = from_currency
    response_body['to_currency'] = to_currency
    response_body['original_amount'] = amount
    response_body['conversion_rate'] = data.get('conversion_rate')
    response_body['converted_amount'] = data.get('conversion_result')
    return (response_body), 200
