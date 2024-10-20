import os
from . import converter_bp
from flask import Flask, request, jsonify
from flask_cors import CORS
from api.models import db, Users, Ideas, FavoriteIdeas
import requests


@converter_bp.route('/converter', methods=['GET'])
def converter():
    response_body: {}
    cantidad = request.args.get('amount', type=float)
    moneda_origen = request.args.get('from', default='EUR')
    moneda_destino = request.args.get('to', default='USD')
    app_id = os.get.env("CONVERTER_API_KEY")
    url = f'https://openexchangerates.org/api/convert/{cantidad}/{moneda_origen}/{moneda_destino}?app_id={app_id}&prettyprint=false'

    response = requests.get(url)
    if response.status_code == 200: 
        converter_data = response.json()
        response_body['message'] = 'Conversion ok'
        response_body['results'] = converter_data
        return jsonify(response_body), 200

    else:
        response_body['message'] = 'Error'
        return jsonify(response_body), response.status_code
