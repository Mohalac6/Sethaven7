export class ChatHistory {
    constructor() {
        this.history = JSON.parse(localStorage.getItem('chatHistory')) || [];
    }

    addChat(userMessage, botResponse) {
        this.history.push({ userMessage, botResponse });
        this.saveHistory();
    }

    getHistory() {
        return this.history;
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
    }

    saveHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(this.history));
    }
}