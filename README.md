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
   source env/bin/activate
   env\Scripts\activate # Sous Windows
   pip install -r requirements.txt
   ```

4. Configurez le fichier .env avec vos informations de connexion à l'API Groq.

   ```
   GROQ_API_KEY=your_api_key_here
   GROQ_MODEL_ID=your_model_id
   ```
5. Installez les dépendances JavaScript si nécessaire (si vous utilisez des outils front-end comme npm ou Yarn) :
   
   ```node
   npm install
   ```

## Démarrage de l'application

1. Démarrer le backend Flask :

   ```bash
   python app.py
   ```

   Le serveur démarrera sur http://localhost:7777

2. Accéder à l'application : Ouvrez votre navigateur et allez sur http://localhost:7777.


## Structure du Projet

- **app.py**: Le point d'entrée du serveur Flask et la configuration des routes pour l'API.

- **config.py** : Configuration de l'API Groq et validation des variables d'environnement.

- **static/** : Contient les fichiers CSS et JavaScript pour le front-end.

- **templates/** : Contient le fichier HTML pour l'interface utilisateur.

- **chatUI.js**, **chatHistory.js**, **aiService.js**, **app.js** : Modules JavaScript pour gérer l'interface de chat, l'historique et la communication avec l'API backend.


## Exemple d'utilisation

1. Tapez votre message dans le champ de saisie et cliquez sur "Envoyer" pour interagir avec le chatbot.


2. L'IA répondra en temps réel, et l'historique de la conversation sera stocké.


3. Vous pouvez accéder à l'historique dans la barre latérale et le supprimer si nécessaire.


## Développement

Pour le développement et les tests, assurez-vous d'activer le mode débogage dans Flask :

  ```bash
  export FLASK_ENV=development
  set FLASK_ENV=development # Sous Windows 
  ```

Ensuite, lancez l'application en mode débogage :

  ```bash
   python app.py
  ```

## Auteurs

[Mohamed](https://github.com/Mohalac6)


## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Remarques

Si vous avez des suggestions ou des améliorations pour ce projet, n'hésitez pas à soumettre une demande de pull ou à ouvrir une issue.

Cette documentation offre une vue d'ensemble complète de l'application, incluant les étapes d'installation, de configuration et d'exécution. Elle est adaptée pour des utilisateurs qui souhaitent utiliser ou contribuer au projet.

