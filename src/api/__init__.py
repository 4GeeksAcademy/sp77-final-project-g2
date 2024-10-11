from flask import Flask
from .user import user_bp

def create_app():
    app = Flask(__name__)

    app.register_blueprint(user_bp)

    return app
