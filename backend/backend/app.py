from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import random_hello  # Import the random greeting module

# Configure Google Generative AI
genai.configure(api_key="YOUR_API_KEY")  # Replace with your actual API key

# Define model and generation configuration
generation_config = {
    "temperature": 0.7,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="tunedModels/giftgeniev1pro20-davy53jpgxwr",
    generation_config=generation_config,
)

app = Flask(__name__)
CORS(app)

# Route for generating a random greeting message
@app.route("/greeting", methods=["GET"])
def greeting():
    random_greeting = random_hello.get_random_greeting()
    return jsonify({"message": random_greeting})

# Route for chatbot interactions
@app.route("/chat", methods=["POST"])
def chat_with_bot():
    data = request.get_json()
    user_input = data.get("message", "")

    # Initialize chat session
    chat_session = model.start_chat()

    # Get chatbot response
    response = chat_session.send_message(user_input)
    return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
