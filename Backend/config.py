from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///artisanhub.db'


# database configuration

class Base(DeclerativeBase):
    pass

db = SQLAlchemy(model_class=Base)
db.init_app(app)