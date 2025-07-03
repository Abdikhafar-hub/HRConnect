#config.py
import os

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Base configuration class."""

    # Secret Key for securely signing the session cookie
    SECRET_KEY = os.environ.get('SECRET_KEY')

    # Configuration for Flask-SQLAlchemy (Database)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

    # JWT Configuration
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')

    # CORS Headers Configuration (if using flask-cors)
    CORS_HEADERS = 'Content-Type'

    # Enable cross-origin resource sharing globally
    CORS = True

    # OpenAI API key
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

class DevelopmentConfig(Config):
    """Development configuration settings."""

    # Use an SQLite database for development
    SQLALCHEMY_DATABASE_URI ='postgresql://postgres.kzrefocxmfubfpsxqrll:Password12345@aws-0-eu-north-1.pooler.supabase.com:5432/postgres'
    TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
    TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
    TWILIO_WHATSAPP_NUMBER = os.getenv('TWILIO_WHATSAPP_NUMBER')


    # Enable debugging
    DEBUG = True

    # Development-specific logging
    LOGGING_LEVEL = 'DEBUG'
