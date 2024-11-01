import os
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")

# Create the model
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
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
)

chat_session = model.start_chat(
  history=[
  ]
)

def chat_with_bot():
    print("Chatbot is ready! Type 'exit' to end the conversation.\n\n")

    import random_hello
    
    while True:
        user_input = input("You: ")  # Take user input dynamically

        if user_input.lower() == "exit":
            print("Chatbot: Goodbye!")
            break

        # Send the user's message to the chatbot
        response = chat_session.send_message(user_input)
        
        # Print the chatbot's response
        print(f"Chatbot: {response.text}\n")

chat_with_bot()