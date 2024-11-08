import { ChatUI } from './chatUI.js';
import { ChatHistory } from './chatHistory.js';
import { AIService } from './aiService.js';

/**
 * Classe principale App pour initialiser et gérer l'application chatbot.
 * Gère les interactions de l'interface utilisateur, les écouteurs d'événements et la communication avec AIService.
 */
class App {
    /**
     * Initialise l'App avec les instances de ChatUI, ChatHistory et AIService.
     * Configure les écouteurs d'événements et charge l'historique des chats.
     */
    constructor() {
        this.chatUI = new ChatUI();
        this.chatHistory = new ChatHistory();
        this.aiService = new AIService();
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOverlay = document.getElementById('sidebar-overlay');

        this.setupEventListeners();
        this.loadChatHistory();
    }

    /**
     * Configure les écouteurs d'événements pour les interactions de l'interface utilisateur.
     */
    setupEventListeners() {
        document.getElementById('chat-form').addEventListener('submit', this.handleSubmit.bind(this));
        document.getElementById('new-chat').addEventListener('click', this.startNewChat.bind(this));
        document.getElementById('clear-history').addEventListener('click', this.clearHistory.bind(this));
        document.getElementById('toggle-sidebar').addEventListener('click', this.toggleSidebar.bind(this));
        this.sidebarOverlay.addEventListener('click', this.closeSidebar.bind(this));
    }

    /**
     * Gère la soumission du formulaire pour envoyer un message.
     * @param {Event} event - L'événement de soumission du formulaire.
     */
    async handleSubmit(event) {
        event.preventDefault();
        const userInput = this.chatUI.getUserInput();

        // Vérifie si l'entrée utilisateur est vide avant l'envoi
        if (!userInput) {
            console.warn("L'entrée utilisateur est vide");
            return;
        }

        this.chatUI.addMessage(userInput, 'user');
        this.chatUI.clearInput();

        try {
            // Récupère la réponse du bot et met à jour l'interface utilisateur
            const botResponse = await this.aiService.getBotResponse(userInput);
            this.chatUI.addMessage(botResponse, 'bot');

            // Enregistre la conversation dans l'historique des chats
            this.chatHistory.addChat(userInput, botResponse);
            this.updateChatHistoryUI();
        } catch (error) {
            console.error("Erreur lors de l'obtention de la réponse du bot :", error);
            this.chatUI.addMessage("Erreur : Impossible d'obtenir une réponse. Veuillez réessayer.", 'bot');
        }
    }

    /**
     * Démarre une nouvelle conversation en effaçant les messages et en fermant la barre latérale.
     */
    startNewChat() {
        this.chatUI.clearMessages();
        this.closeSidebar();
    }

    /**
     * Efface l'historique des chats et met à jour l'interface utilisateur.
     */
    clearHistory() {
        this.chatHistory.clearHistory();
        this.updateChatHistoryUI();
        this.closeSidebar();
    }

    /**
     * Charge l'historique des chats depuis le stockage local et peuple l'interface utilisateur.
     */
    loadChatHistory() {
        const history = this.chatHistory.getHistory();
        history.forEach(chat => {
            this.chatUI.addMessage(chat.userMessage, 'user');
            this.chatUI.addMessage(chat.botResponse, 'bot');
        });
        this.updateChatHistoryUI();
    }

    /**
     * Met à jour l'interface utilisateur de l'historique des chats avec l'historique actuel.
     */
    updateChatHistoryUI() {
        const historyContainer = document.querySelector('.chat-history');
        historyContainer.innerHTML = '';

        const history = this.chatHistory.getHistory();
        history.forEach((chat, index) => {
            const chatItem = document.createElement('div');
            chatItem.classList.add('chat-history-item');
            chatItem.innerHTML = `
                <i data-lucide="message-square"></i>
                <span>Chat ${index + 1}</span>
            `;
            chatItem.addEventListener('click', () => this.loadChat(chat));
            historyContainer.appendChild(chatItem);
        });

        // Réinitialise les icônes Lucide après la mise à jour du DOM
        lucide.createIcons();
    }

    /**
     * Charge un chat spécifique de l'historique dans l'interface utilisateur du chat.
     * @param {Object} chat - L'objet de chat à charger.
     */
    loadChat(chat) {
        this.chatUI.clearMessages();
        this.chatUI.addMessage(chat.userMessage, 'user');
        this.chatUI.addMessage(chat.botResponse, 'bot');
        this.closeSidebar();
    }

    /**
     * Bascule la visibilité de la barre latérale.
     */
    toggleSidebar() {
        this.sidebar.classList.toggle('open');
        this.sidebarOverlay.classList.toggle('open');
    }

    /**
     * Ferme la barre latérale.
     */
    closeSidebar() {
        this.sidebar.classList.remove('open');
        this.sidebarOverlay.classList.remove('open');
    }
}

// Initialise l'App lorsque le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    new App();
    lucide.createIcons();
});
