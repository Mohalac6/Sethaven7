import traceback

from flask import Flask, render_template, request, jsonify
from groq import Groq

from config import Config

app = Flask(__name__)

# Initialise le client Groq avec la clé API fournie
client = Groq(api_key=Config.API_KEY)

@app.route('/')
def index():
    """
    Affiche la page d'accueil de l'application web.
    """
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Gère les requêtes de chat provenant du front-end, traite les messages de l'utilisateur
    et retourne une réponse du chatbot via l'API Groq.
    
    Retourne :
        - Une réponse JSON contenant le message du bot et le temps de réponse si la requête réussit.
        - Une réponse d'erreur 400 si le format de la requête est invalide.
        - Une réponse d'erreur 500 en cas d'erreur côté serveur.
    """
    try:
        # Analyse les données JSON reçues
        data = request.get_json()
        
        # Valide les données entrantes
        if not data or 'messages' not in data:
            raise ValueError("Le formulaire de la requête est vide")
    
    except Exception as e:
        # Affiche la trace de l'erreur pour faciliter le débogage
        traceback.print_exc()
        return jsonify({'error': 'Format de requête invalide'}), 400

    try:
        # Envoie une requête à l'API Groq pour obtenir une réponse de chat
        chat_response = client.chat.completions.create(
            messages=data['messages'],
            model=Config.MODEL_ID,
            max_tokens=Config.MAX_TOKENS,
            temperature=Config.TEMPERATURE,
            top_p=Config.TOP_P,
            stop=None,
            stream=False
        )

        # Extrait le contenu du message et le temps de réponse depuis la réponse de l'API
        message_content = chat_response.choices[0].message.content

        # Retourne le message du bot et le temps de réponse sous forme de réponse JSON
        return jsonify({
            'message': message_content
        })

    except Exception as e:
        # Affiche le message d'erreur et la trace pour faciliter le débogage
        print(f"Erreur : {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port='7777')
