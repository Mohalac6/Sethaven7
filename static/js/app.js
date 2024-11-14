import { ChatUI } from './chatUI.js';
import { ChatHistory } from './chatHistory.js';
import { AIService } from './aiService.js';

/**
 * Main App class to initialize and handle the chatbot application.
 * Manages UI interactions, event listeners, and communication with AIService.
 */
class App {
    /**
     * Initializes the App with ChatUI, ChatHistory, and AIService instances.
     * Sets up event listeners and loads chat history.
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
     * Sets up event listeners for UI interactions.
     */
    setupEventListeners() {
        document.getElementById('chat-form').addEventListener('submit', this.handleSubmit.bind(this));
        document.getElementById('new-chat').addEventListener('click', this.startNewChat.bind(this));
        document.getElementById('clear-history').addEventListener('click', this.clearHistory.bind(this));
        document.getElementById('toggle-sidebar').addEventListener('click', this.toggleSidebar.bind(this));
        this.sidebarOverlay.addEventListener('click', this.closeSidebar.bind(this));
    }

    /**
     * Handles form submission for sending a message.
     * @param {Event} event - The form submit event.
     */
    async handleSubmit(event) {
        event.preventDefault();
        const userInput = this.chatUI.getUserInput();

        // Check if the input is empty before sending
        if (!userInput) {
            console.warn("The user input is empty");
            return;
        }

        this.chatUI.addMessage(userInput, 'user');
        this.chatUI.clearInput();

        try {
            // Fetch bot response and update UI
            const botResponse = await this.aiService.getBotResponse(userInput);
            this.chatUI.addMessage(botResponse, 'bot');

            // Save conversation to chat history
            this.chatHistory.addChat(userInput, botResponse);
            this.updateChatHistoryUI();
        } catch (error) {
            console.error("Error getting bot response:", error);
            this.chatUI.addMessage("Error: Unable to get a response. Please try again.", 'bot');
        }
    }

    /**
     * Starts a new chat by clearing messages and closing the sidebar.
     */
    startNewChat() {
        this.chatUI.clearMessages();
        this.closeSidebar();
    }

    /**
     * Clears the chat history and updates the UI.
     */
    clearHistory() {
        this.chatHistory.clearHistory();
        this.updateChatHistoryUI();
        this.closeSidebar();
    }

    /**
     * Loads chat history from local storage and populates the chat UI.
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
     * Updates the chat history UI with the current history.
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

        // Reinitialize Lucide icons after updating the DOM
        lucide.createIcons();
    }

    /**
     * Loads a specific chat from history into the chat UI.
     * @param {Object} chat - The chat object to load.
     */
    loadChat(chat) {
        this.chatUI.clearMessages();
        this.chatUI.addMessage(chat.userMessage, 'user');
        this.chatUI.addMessage(chat.botResponse, 'bot');
        this.closeSidebar();
    }

    /**
     * Toggles the sidebar visibility.
     */
    toggleSidebar() {
        this.sidebar.classList.toggle('open');
        this.sidebarOverlay.classList.toggle('open');
    }

    /**
     * Closes the sidebar.
     */
    closeSidebar() {
        this.sidebar.classList.remove('open');
        this.sidebarOverlay.classList.remove('open');
    }
}

// Initialize the App when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
    lucide.createIcons();
});
