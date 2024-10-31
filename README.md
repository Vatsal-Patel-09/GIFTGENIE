# GIFTGENIE

## Overview
GIFTGENIE is an AI-powered gifting e-commerce platform designed to simplify the gift selection process for users. By leveraging advanced machine learning algorithms and a user-friendly chatbot interface, GIFTGENIE provides personalized gift recommendations based on user preferences, occasions, and recipient characteristics.

## Features
- **AI-Powered Recommendations**: Utilizes machine learning to analyze user inputs and suggest relevant gift options.
- **Interactive Chatbot**: Engages users through an intuitive chat interface for seamless interaction and assistance.
- **Diverse Product Catalog**: Offers a wide range of gift categories, ensuring options for every occasion.
- **User Profiles**: Allows users to create profiles to save preferences and enhance the recommendation process.
- **Secure Checkout**: Implements secure payment options for a smooth purchasing experience.

## Technologies Used
- **Frontend**: React.js for a dynamic user interface
- **Backend**: Python with Flask for server-side logic
- **AI/ML**: Developed using Google Gemini's self fine tuned modle "GIFTGENIE-V1-pro_v2.0" fine tuned on "models/gemini-1.5-flash-001-tuning" for recomendation of gifts

## Installation
To set up the project locally, clone the repository and follow the installation instructions:

```bash
git clone https://github.com/yourusername/giftgenie.git
cd giftgenie
```
## Frontend Setup
Navigate to the frontend directory:
```bash
cd giftgenie
```
Install dependencies:
```bash
npm install
```
Start the development server:
```bash
npm start
```
## Backend Setup

Navigate to the backend directory:
```bash
cd backend
```
Install dependencies:
```bash
pip install -r requirements.txt
```
Set up your environment variables. Create a .env file in the backend directory and add the following variables:
```makefile
MONGODB_URI=<your_mongodb_uri>
SECRET_KEY=<your_secret_key>
```
Run the server:
```bash
python app.py
```
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any inquiries or feedback, feel free to reach out to vatsalpatel952005@gmail.com or open an issue in the repository.
