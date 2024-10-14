from flask import Flask
from .user import user_bp
from .ideas import ideas_bp
from .news import news_bp

def create_app():
    app = Flask(__name__)

    app.register_blueprint(user_bp)
    app.register_blueprint(ideas_bp)
    app.register_blueprint(news_bp)

    return app
