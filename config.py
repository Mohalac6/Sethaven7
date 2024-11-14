import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # API credentials
    API_KEY = os.getenv("GROQ_API_KEY")
    MODEL_ID = os.getenv("GROQ_MODEL_ID", "llama3-8b-8192")

    # Chat configuration
    MAX_TOKENS = int(os.getenv("MAX_TOKENS", 1000))
    TEMPERATURE = float(os.getenv("TEMPERATURE", 0.5))
    TOP_P = float(os.getenv("TOP_P", 1))

    # Validate required settings
    @classmethod
    def validate(cls):
        if not cls.API_KEY:
            raise ValueError("GROQ_API_KEY is not set in the environment variables.")
        if not cls.MODEL_ID:
            raise ValueError("GROQ_MODEL_ID is not set in the environment variables.")

# Validate configuration on import
Config.validate()