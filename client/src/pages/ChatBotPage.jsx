import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Send, Bot, User } from "lucide-react";
import Footer from "../components/Footer";
import { useChatbotStore } from "../store/useChatbotStore";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatBotPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const { getAiResponse, searchProductByName } = useChatbotStore();
  const { addToCart } = useProductStore();
  const { userData } = useAuthStore();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0 && userData?.username) {
      setTimeout(() => addBotMessage(`Hey ${userData.username}!`), 500);
      setTimeout(() => addBotMessage("Welcome to our pharmacy store!"), 1500);
      setTimeout(() => {
        addBotMessage(
          "I'm here to help you with your health queries. Could you please tell me about your symptoms or what you're looking for?"
        );
      }, 2500);
    }
  }, [userData]);

  const addBotMessage = (text) => {
    const message = {
      id: Date.now(),
      type: "text",
      text,
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, message]);
  };

  const addUserMessage = (text) => {
    const message = {
      id: Date.now(),
      type: "text",
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, message]);
  };

  const addBotProductCard = (product) => {
    const message = {
      id: Date.now(),
      type: "product",
      product,
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, message]);
  };

  const generateBotResponse = async (userInput) => {
    const input = userInput.toLowerCase();
    const finalJSONResponse = await getAiResponse(input);
    const result = finalJSONResponse.toolResult;

    // Add brief_info message
    addBotMessage(result.brief_info);

    if (result.availability_status === "available") {
      const product = await searchProductByName(
        result.recommended_product.prodTitle
      );

      if (product) {
        addBotProductCard(product);
      }
    } else {
      addBotMessage(result.generic_message);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    addUserMessage(inputMessage);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(async () => {
      await generateBotResponse(inputMessage);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              MyPharma Assistant
            </h1>
            <p className="text-gray-600">
              Get instant help with your health queries and medication needs
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">MyPharma Assistant</h3>
                  <p className="text-green-100">Online now . Ready to help</p>
                </div>
              </div>
            </div>

            <div
              className="h-96 overflow-y-auto p-6 bg-gray-50"
              ref={messagesEndRef}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-6 transition-all duration-300 ease-out ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-3 ${
                      message.sender === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === "user"
                          ? "bg-green-500"
                          : "bg-white border-2 border-green-200"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-green-500" />
                      )}
                    </div>

                    {/* Message or Product Card */}
                    <div className="max-w-md">
                      {message.type === "product" ? (
                        <div
                          className="bg-white p-4 border border-green-200 rounded-xl hover:shadow-md"
                          onClick={() => {
                            navigate(`/products/${message.product._id}`);
                          }}
                        >
                          <img
                            src={message.product.image}
                            alt={message.product.prodTitle}
                            className="w-full h-32 object-cover rounded-md mb-3"
                          />
                          <h4 className="font-semibold text-gray-800 mb-1">
                            {message.product.prodTitle}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {message.product?.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-green-600">
                              &#8377;{message.product.price?.org}
                            </span>
                            <button
                              className="bg-green-500 text-white px-3 py-1 ml-2 rounded-md text-sm hover:bg-green-600 transition-colors"
                              onClick={() => {
                                addToCart(message.product._id);
                              }}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`inline-block px-4 py-3 rounded-2xl ${
                            message.sender === "user"
                              ? "bg-green-500 text-white rounded-br-sm"
                              : "bg-white text-gray-800 border border-green-200 rounded-bl-sm shadow-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {message.text}
                          </p>
                        </div>
                      )}
                      <p className="text-xs mt-1 text-gray-500">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="mb-6 transition-all duration-300 ease-out">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white border-2 border-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="bg-white text-gray-800 border border-green-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-green-200 bg-white">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your symptoms or health questions here..."
                  className="flex-1 border border-green-300 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors transform hover:scale-105 flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                This chatbot provides general health information. For serious
                concerns, please consult a healthcare professional.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div
              className={`bg-green-200 border-purple-200 hover:shadow-lg transition-shadow`}
            >
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">💬</div>
                <h4 className="font-semibold text-gray-800 mb-2">Quick Help</h4>
                <p className="text-sm text-gray-600">
                  Ask about symptoms, medications, or general health advice.
                </p>
              </div>
            </div>
            <div
              className={`bg-green-50 border-green-200 hover:shadow-lg transition-shadow`}
            >
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">⏰</div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  24/7 Available
                </h4>
                <p className="text-sm text-gray-600">
                  Our AI assistant is always here to help with your questions.
                </p>
              </div>
            </div>
            <div
              className={`bg-green-200 border-purple-200 hover:shadow-lg transition-shadow`}
            >
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">👩‍⚕️</div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Professional Advice
                </h4>
                <p className="text-sm text-gray-600">
                  Get recommendations for speaking with our qualified
                  pharmacists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChatBotPage;
