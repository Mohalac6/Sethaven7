/**
 * Classe AIService responsable de récupérer les réponses de l'API backend.
 * Cette classe utilise des appels API asynchrones pour communiquer avec le serveur
 * et obtenir des réponses du chatbot en fonction des messages de l'utilisateur.
 */
export class AIService {
    /**
     * Récupère une réponse du chatbot à partir de l'API backend.
     *
     * @param {string} userInput - Le message de l'utilisateur.
     * @returns {Promise<string>} - Une promesse qui se résout avec la réponse du chatbot.
     * @throws {Error} - Lance une erreur si la requête réseau échoue.
     */
    async getBotResponse(userInput) {
        try {
            // Valide l'entrée utilisateur pour s'assurer qu'elle n'est pas vide
            if (!userInput.trim()) {
                throw new Error("Le message de l'utilisateur ne peut pas être vide.");
            }

            // Prépare les données de la requête
            const payload = {
                messages: [{ role: 'user', content: userInput }]
            };

            // Envoie une requête POST à l'API backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            // Vérifie si le statut de la réponse indique une requête réussie
            if (!response.ok) {
                throw new Error(`Erreur réseau : ${response.statusText} (Code de statut : ${response.status})`);
            }

            // Analyse et renvoie la réponse JSON
            const data = await response.json();
            if (!data.message) {
                throw new Error("Format inattendu de la réponse API : le champ 'message' est manquant.");
            }

            return data.message;
        } catch (error) {
            // Affiche l'erreur dans la console pour faciliter le débogage
            console.error('Erreur lors de la récupération de la réponse du bot :', error);

            // Relance l'erreur pour la gérer dans le code appelant
            throw error;
        }
    }
                }
