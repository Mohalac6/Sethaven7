export class ChatHistory {
    /**
     * Constructeur de la classe ChatHistory.
     * Initialise l'historique des chats en récupérant les données stockées dans le stockage local (localStorage),
     * ou crée un tableau vide si aucune donnée n'est trouvée.
     */
    constructor() {
        this.history = JSON.parse(localStorage.getItem('chatHistory')) || [];
    }

    /**
     * Ajoute un nouveau message utilisateur et une réponse du bot à l'historique des chats.
     * Enregistre ensuite l'historique mis à jour dans le stockage local.
     *
     * @param {string} userMessage - Le message envoyé par l'utilisateur.
     * @param {string} botResponse - La réponse du bot au message de l'utilisateur.
     */
    addChat(userMessage, botResponse) {
        this.history.push({ userMessage, botResponse });
        this.saveHistory();
    }

    /**
     * Récupère l'historique des chats.
     *
     * @returns {Array} - Retourne un tableau contenant l'historique des messages et réponses du bot.
     */
    getHistory() {
        return this.history;
    }

    /**
     * Efface l'historique des chats en réinitialisant le tableau d'historique.
     * Met ensuite à jour le stockage local pour refléter cette suppression.
     */
    clearHistory() {
        this.history = [];
        this.saveHistory();
    }

    /**
     * Sauvegarde l'historique des chats actuel dans le stockage local en tant que chaîne JSON.
     */
    saveHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(this.history));
    }
    }
