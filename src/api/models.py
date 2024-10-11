from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name = db.Column(db.String, unique =False, nullable=False)
    last_name = db.Column(db.String, unique =False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    create_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.id} - {self.email}>'

    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'password': self.password,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'is_active': self.is_active,
                'create_at': self.create_at}


class Ideas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String, unique=False, nullable=False)
    area = db.Column(db.String, unique=False, nullable=False)
    budget = db.Column(db.Integer, unique=False, nullable=False)
    
    def __repr__(self):
        return f'Idea {self.id} - {self.budget}'
    
    def serialize(self):
        return{'id': self.id,
               'country': self.country,
               'area': self.area,
               'budget': self.budget}
    

class  FavoriteIdeas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    description = db.Column(db.String, unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'FavoriteIdea {self.id} - {self.title}'
    
    def serialize(self):
        return{'id': self.id,
               'title': self.title,
               'description': self.description,
               'user_id': self.user_id}
    

""" class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    country = db.Column(db.String, unique=False, nullable=False)
    category = db.Column(db.String, unique=False, nullable=False) """
