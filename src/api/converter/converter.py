import os
from . import converter_bp
from flask import Flask, request, jsonify
from flask_cors import CORS
from api.models import db, Users, Ideas, FavoriteIdeas
import requests

CORS(converter_bp)  # Habilitar CORS si es necesario

@converter_bp.route('/converter', methods=['GET'])  # Método GET
def converter():
    api_key = os.getenv("CONVERTER_API_KEY")

    # Obtener los datos desde los parámetros de la URL
    from_currency = request.args.get('from_currency')
    to_currency = request.args.get('to_currency')
    amount = request.args.get('amount')

    # Verificar que los parámetros no estén vacíos
    if not from_currency or not to_currency or not amount:
        return jsonify({"error": "Faltan parámetros de entrada"}), 400

    # Crear la URL para la solicitud de conversión
    url = f"https://v6.exchangerate-api.com/v6/{api_key}/pair/{from_currency}/{to_currency}/{amount}"
    
    # Hacer la solicitud GET a la API
    response = requests.get(url)

    # Manejar errores en la solicitud
    if response.status_code != 200:
        return jsonify({"error": "Error al obtener las tasas de cambio"}), 500

    # Obtener los datos en formato JSON de la respuesta
    data = response.json()

    # Verificar si hubo un error en los datos obtenidos
    if data.get('result') == 'error':
        return jsonify({"error": data.get('error-type')}), 400

    # Retornar los resultados de la conversión
    return jsonify({
        "from_currency": from_currency,
        "to_currency": to_currency,
        "original_amount": amount,
        "conversion_rate": data.get('conversion_rate'),
        "converted_amount": data.get('conversion_result')
    }), 200
