import socket
import traceback
from flask import Flask, render_template, request, jsonify
from groq import Groq
from config import Config

app = Flask(__name__)

# Initialize Groq client with the provided API key
client = Groq(api_key=Config.API_KEY)

@app.route('/')
def index():
    """
    Renders the index page for the web application.
    """
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Handles the chat requests from the front-end, processes user messages,
    and returns a chatbot response using the Groq API.
    
    Returns:
        - A JSON response with the bot's message and completion time if successful.
        - A 400 error response if the request format is invalid.
        - A 500 error response if there is a server-side error.
    """
    try:
        # Parse the incoming JSON data
        data = request.get_json()
        
        # Validate the incoming data
        if not data or 'messages' not in data:
            raise ValueError("The requested form is empty")
    
    except Exception as e:
        # Log the error traceback for debugging purposes
        traceback.print_exc()
        return jsonify({'error': 'Invalid request format'}), 400

    try:
        # Send a request to the Groq API for chat completion
        chat_response = client.chat.completions.create(
            messages=data['messages'],
            model=Config.MODEL_ID,
            max_tokens=Config.MAX_TOKENS,
            temperature=Config.TEMPERATURE,
            top_p=Config.TOP_P,
            stop=None,
            stream=False
        )

        # Extract the message content and completion time from the API response
        message_content = chat_response.choices[0].message.content
        completion_time = chat_response.usage.completion_time

        # Return the bot's message and the completion time as a JSON response
        return jsonify({
            'message': message_content,
            'completion_time': completion_time
        })

    except Exception as e:
        # Log the error message and traceback for debugging
        print(f"Error: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app on the host's IP and port 7777
    HOST = socket.gethostbyname(socket.gethostname())
    PORT = 7777  # Changed to integer for consistency
    app.run(debug=True, host=HOST, port=PORT)

