/**
 * La classe ChatUI gère l'interface utilisateur pour afficher les messages de chat et interagir avec le champ de saisie.
 */
export class ChatUI {
    /**
     * Initialise ChatUI en sélectionnant les éléments DOM pour l'affichage des messages et la saisie utilisateur.
     */
    constructor() {
        // Élément où les messages de chat seront affichés
        this.messagesContainer = document.getElementById('chat-messages');

        // Champ de saisie où l'utilisateur tape son message
        this.userInput = document.getElementById('user-input');
    }

    /**
     * Ajoute un nouveau message à l'interface de chat.
     * 
     * @param {string} message - Le contenu du message à afficher.
     * @param {string} sender - Le type d'expéditeur, soit 'user' (utilisateur) soit 'bot'.
     */
    addMessage(message, sender) {
        // Crée un nouvel élément de message
        const messageElement = document.createElement('div');

        // Ajoute des classes spécifiques au message et à l'expéditeur
        messageElement.classList.add('message', `${sender}-message`);

        // Définit le contenu texte de l'élément de message
        messageElement.textContent = message;

        // Ajoute l'élément de message au conteneur de messages
        this.messagesContainer.appendChild(messageElement);

        // Défiler vers le bas du conteneur de messages
        this.scrollToBottom();
    }

    /**
     * Récupère et nettoie la saisie utilisateur du champ de saisie.
     * 
     * @returns {string} - La saisie utilisateur nettoyée (sans espaces inutiles).
     */
    getUserInput() {
        return this.userInput.value.trim();
    }

    /**
     * Efface le champ de saisie utilisateur.
     */
    clearInput() {
        this.userInput.value = '';
    }

    /**
     * Efface tous les messages de l'interface de chat.
     */
    clearMessages() {
        this.messagesContainer.innerHTML = '';
    }

    /**
     * Défiler le conteneur des messages de chat vers le bas pour s'assurer que le dernier message est visible.
     */
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    }
