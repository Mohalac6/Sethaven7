import os
from dotenv import load_dotenv

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

class Config:
    # Identifiants de l'API
    API_KEY = os.getenv("GROQ_API_KEY")  # Clé API pour accéder au service
    MODEL_ID = os.getenv("GROQ_MODEL_ID", "llama3-8b-8192")  # Identifiant du modèle, par défaut "llama3-8b-8192"

    # Configuration du chat
    MAX_TOKENS = int(os.getenv("MAX_TOKENS", 1000))  # Nombre maximum de tokens pour une réponse, par défaut 1000
    TEMPERATURE = float(os.getenv("TEMPERATURE", 0.5))  # Paramètre de température pour la créativité, par défaut 0.5
    TOP_P = float(os.getenv("TOP_P", 1))  # Paramètre de filtre de probabilité pour générer des réponses, par défaut 1

    # Validation des paramètres requis
    @classmethod
    def validate(cls):
        # Vérifie que la clé API est définie
        if not cls.API_KEY:
            raise ValueError("La variable d'environnement GROQ_API_KEY n'est pas définie.")
        
        # Vérifie que l'identifiant du modèle est défini
        if not cls.MODEL_ID:
            raise ValueError("La variable d'environnement GROQ_MODEL_ID n'est pas définie.")

# Valide la configuration lors de l'importation
Config.validate()
