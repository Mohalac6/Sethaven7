/**
 * AIService class responsible for fetching responses from the backend API.
 * This class uses asynchronous API calls to communicate with the server and
 * fetch chatbot responses based on user input.
 */
export class AIService {
    /**
     * Fetches a chatbot response from the backend API.
     *
     * @param {string} userInput - The input message from the user.
     * @returns {Promise<string>} - A promise that resolves to the chatbot's response.
     * @throws {Error} - Throws an error if the network request fails.
     */
    async getBotResponse(userInput) {
        try {
            // Validate the user input to ensure it is not empty
            if (!userInput.trim()) {
                throw new Error("User input cannot be empty.");
            }

            // Prepare the request payload
            const payload = {
                messages: [{ role: 'user', content: userInput }]
            };

            // Send a POST request to the backend API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            // Check if the response status indicates a successful request
            if (!response.ok) {
                throw new Error(`Network error: ${response.statusText} (Status code: ${response.status})`);
            }

            // Parse and return the JSON response
            const data = await response.json();
            if (!data.message) {
                throw new Error("Unexpected API response format: 'message' field is missing.");
            }

            return data.message;
        } catch (error) {
            // Log the error to the console for debugging purposes
            console.error('Error fetching bot response:', error);

            // Rethrow the error to handle it in the calling code
            throw error;
        }
    }
}
