# Sethaven7 - Application de Chatbot

Sethaven7 est une application de chatbot interactive permettant aux utilisateurs d'interagir avec un modèle d'intelligence artificielle à travers une interface web. Cette application utilise une architecture front-end avec JavaScript et une API en arrière-plan pour la gestion des réponses de l'IA.

## Fonctionnalités

- **Interface utilisateur de chat :** Permet aux utilisateurs d'envoyer des messages et de recevoir des réponses de l'IA.
- **Historique des chats :** Stocke les conversations localement, permettant aux utilisateurs de revoir les conversations passées.
- **Effacement de l'historique :** Les utilisateurs peuvent facilement supprimer l'historique des conversations.
- **Barre latérale :** Affiche l'historique des chats avec une option pour basculer l'affichage.

## Prérequis

Pour exécuter cette application en local, vous devez disposer de :

- **Python** (pour lancer le serveur backend Flask)
- **Node.js** (pour le développement et les dépendances front-end)
- **Git** (pour le contrôle de version)
- **Modules Python** : Flask, dotenv (pour gérer les variables d'environnement)
- **Connexion à l'API Groq** avec un fichier `.env` contenant les informations suivantes :
  ```
  GROQ_API_KEY=your_api_key_here
  GROQ_MODEL_ID=your_model_id
  
  MAX_TOKENS=1000
  TEMPERATURE=0.5
  TOP_P=1
  ```

## Installation

1. Clonez le dépôt du projet :

 ```bash
 git clone
https://github.com/Mohalac6/Sethaven7.git
 ```

2. Installez les dépendances Python requises dans votre environnement virtuel :
   
   ```
   cd Sethaven7
   python -m venv env
   source env/bin/activate  # Sous Windows: env\Scripts\activate
   pip install -r requirements.txt
   ```

4. Configurez le fichier .env avec vos informations de connexion à l'API Groq.


5. Installez les dépendances JavaScript si nécessaire (si vous utilisez des outils front-end comme npm ou Yarn) :

npm install
