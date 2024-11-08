import os
from . import payments_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users
import stripe


CORS(payments_bp)

@payments_bp.route('/checkout', methods=['POST'])
def checkout():
    response_body = {}
    stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

    amount = request.json.get('amount')
    currency = request.json.get('currency', 'usd')

    payment_intent = stripe.PaymentIntent.create(
        amount=int(amount * 100),
        currency=currency,
        payment_method_types=['card']
    )

    response_body['message'] = f"Pago exitoso"
    response_body['results'] = {"paymentIntentId": payment_intent.id,
                                "clientSecret": payment_intent.client_secret}
                                
    return jsonify(response_body), 200
