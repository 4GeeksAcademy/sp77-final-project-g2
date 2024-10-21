import os
from . import converter_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Ideas, FavoriteIdeas
import requests

CORS(converter_bp)

@converter_bp.route('/converter', methods=['GET'])
def converter():
    # Obtener parámetros desde la URL
    from_currency = request.args.get('from_currency')
    to_currency = request.args.get('to_currency')
    amount = request.args.get('amount')

    # Verificar que todos los parámetros están presentes
    if not from_currency or not to_currency or not amount:
        return jsonify({"error": "Faltan parámetros"}), 400

    # Tu API key de ExchangeRate-API (esta la tienes que proteger en el servidor)
    api_key = "4fdff3f21b0a298c92bb54f2"

    # Crear la URL para la API de ExchangeRate
    url = f"https://v6.exchangerate-api.com/v6/{api_key}/pair/{from_currency}/{to_currency}/{amount}"

    # Hacer la solicitud GET a la API de ExchangeRate
    response = requests.get(url)
    data = response.json()

    # Verificar si la API devolvió un error
    if data.get('result') == 'error':
        return jsonify({"error": data.get('error-type')}), 400

    # Devolver los datos relevantes en formato JSON, tal como lo hace ExchangeRate-API
    return jsonify({
        "result": "success",
        "base_code": data.get('base_code'),
        "target_code": data.get('target_code'),
        "conversion_rate": data.get('conversion_rate'),
        "conversion_result": data.get('conversion_result')
    }), 200
