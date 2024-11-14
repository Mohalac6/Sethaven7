/**
 * ChatUI class handles the user interface for displaying chat messages and interacting with the input field.
 */
export class ChatUI {
    /**
     * Initializes the ChatUI by selecting DOM elements for message display and user input.
     */
    constructor() {
        // Element where chat messages will be displayed
        this.messagesContainer = document.getElementById('chat-messages');

        // Input field where the user types their message
        this.userInput = document.getElementById('user-input');
    }

    /**
     * Adds a new message to the chat interface.
     * 
     * @param {string} message - The message content to display.
     * @param {string} sender - The sender type, either 'user' or 'bot'.
     */
    addMessage(message, sender) {
        // Create a new message element
        const messageElement = document.createElement('div');

        // Add message and sender-specific classes
        messageElement.classList.add('message', `${sender}-message`);

        // Set the text content of the message element
        messageElement.textContent = message;

        // Append the message element to the messages container
        this.messagesContainer.appendChild(messageElement);

        // Scroll to the bottom of the messages container
        this.scrollToBottom();
    }

    /**
     * Retrieves and trims the user input from the input field.
     * 
     * @returns {string} - The trimmed user input.
     */
    getUserInput() {
        return this.userInput.value.trim();
    }

    /**
     * Clears the user input field.
     */
    clearInput() {
        this.userInput.value = '';
    }

    /**
     * Clears all chat messages from the chat interface.
     */
    clearMessages() {
        this.messagesContainer.innerHTML = '';
    }

    /**
     * Scrolls the chat messages container to the bottom to ensure the latest message is visible.
     */
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}
