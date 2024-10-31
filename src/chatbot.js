import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaRobot, FaPaperPlane, FaSun, FaMoon, FaRegSmile } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./Chat.css"; // Add your custom styles here

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [error, setError] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to the bottom of the chat when a new message is added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Fetch initial greeting message from the backend
    useEffect(() => {
        const fetchGreeting = async () => {
            try {
                const res = await axios.get("http://localhost:5000/greeting"); // Fetch the greeting
                const greeting = {
                    id: 1,
                    text: res.data.message,
                    sender: "bot",
                    timestamp: new Date(),
                };
                setMessages([greeting]); // Set the greeting as the initial message
            } catch (error) {
                console.error("Error fetching greeting message:", error);
                setError("Unable to connect to the server. Please try again later.");
            }
        };

        fetchGreeting();
    }, []);

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputMessage.trim() === "") {
            setError("Please enter a message");
            return;
        }

        const newMessage = {
            id: messages.length + 1,
            text: inputMessage,
            sender: "user",
            timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage("");
        await sendMessageToBackend(newMessage.text);
    };

    const sendMessageToBackend = async (message) => {
        setIsTyping(true);
        try {
            const res = await axios.post("http://localhost:5000/chat", {
                message: message,
            });

            const botResponse = {
                id: messages.length + 2,
                text: res.data.response,
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        } catch (error) {
            console.error("Error sending message to backend:", error);
            setError("Failed to connect to the server. Please check your network.");
        }
        setIsTyping(false);
    };

    const formatTimestamp = (timestamp) => {
        return new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(timestamp);
    };

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const clearChatHistory = () => {
        setMessages([]);
    };

    const addEmoji = (emoji) => {
        setInputMessage(inputMessage + emoji);
    };

    return (
        <div className={`flex flex-col h-screen ${isDarkTheme ? "bg-gray-900" : "bg-gray-100"} p-4 transition-all duration-300`}>
            <div className="flex items-center justify-between bg-[#A91D3A] p-4 rounded-lg shadow-md mb-4">
                <h1 className="text-2xl font-semibold text-white">GiftGenie</h1>
                <div className="flex items-center">
                    <button 
                        onClick={toggleTheme} 
                        className="text-white hover:text-yellow-400 transition duration-300 p-3 rounded-full"
                        aria-label="Toggle theme"
                    >
                        {isDarkTheme ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
                    </button>
                    <button 
                        onClick={clearChatHistory} 
                        className="text-white hover:text-yellow-400 ml-3 p-3 rounded-full" 
                        aria-label="Clear chat"
                    >
                        Clear Chat
                    </button>
                </div>
            </div>

            <div className={`flex-auto overflow-y-auto mb-4 rounded-lg shadow-lg p-4 transition-all duration-300 ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}>
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
                        <div className={`flex items-center ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                            {message.sender === "user" ? <FaUser className="mr-2 text-gray-800" /> : <FaRobot className="mr-2 text-gray-800" />}
                            <div className={`max-w-xs lg:max-w-md xl:max-w-lg rounded-lg p-4 shadow-md transition-all duration-300 ${message.sender === "user" ? "bg-[#C73659] text-white" : "bg-[#A91D3A] text-white"}`}>
                                <div className="flex items-center mb-1">
                                    <span className="font-semibold">{message.sender === "user" ? "You" : "GiftGenie"}</span>
                                </div>
                                <ReactMarkdown className="mb-1 text-left">{message.text}</ReactMarkdown> {/* Align text to left */}
                                <p className="text-xs text-right opacity-75">{formatTimestamp(message.timestamp)}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start mb-4">
                        <div className="rounded-lg p-4 shadow-md bg-[#A91D3A] text-white">
                            <div className="flex items-center">
                                <FaRobot className="mr-2 text-gray-800" />
                                <p className="text-gray-800">Thinking...</p>
                                <BsThreeDots className="text-gray-800 animate-bounce" />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="relative">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={handleInputChange}
                        placeholder="Type your message here..."
                        className={`w-full p-4 pr-12 rounded-lg border-2 focus:outline-none transition-all duration-300 shadow-md ${isDarkTheme ? "bg-gray-700 text-gray-200 border-[#A91D3A]-600" : "bg-white text-gray-800 border-[#A91D3A]-300"}`}
                    />
                    <button
                        type="submit"
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#C73659] text-white hover:bg-[#A91D3A] transition duration-300 p-3 rounded-full`}
                        aria-label="Send message"
                    >
                        <FaPaperPlane />
                    </button>
                    <button 
                        type="button" 
                        className="absolute right-16 top-1/2 transform -translate-y-1/2 p-3" 
                        onClick={() => addEmoji("😊")}
                        aria-label="Add emoji"
                    >
                        <FaRegSmile />
                    </button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default Chat;
