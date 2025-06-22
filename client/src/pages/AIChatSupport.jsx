// client/src/pages/AIChatSupport.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AIChatSupport = () => {
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'Hi there 👋 I’m here to support you. What’s on your mind today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingMessage]);

  const simulateTyping = (text) => {
    return new Promise((resolve) => {
      let index = 0;
      setTypingMessage('');
      const typingInterval = setInterval(() => {
        setTypingMessage((prev) => prev + text[index]);
        index++;
        if (index === text.length) {
          clearInterval(typingInterval);
          setMessages((prev) => [...prev, { sender: 'assistant', text }]);
          setTypingMessage('');
          resolve();
        }
      }, 30);
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/ai/chat',
        { messages: newMessages },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const aiReply = res.data.reply;
      await simulateTyping(aiReply); // ✅ Typing effect
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'assistant', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-full p-4 dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">AI Chat Support</h2>
      <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-700 rounded p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 max-w-md rounded-lg ${
              msg.sender === 'user' ? 'bg-blue-200 ml-auto' : 'bg-green-200 mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {typingMessage && (
          <div className="p-2 max-w-md rounded-lg bg-green-200 mr-auto animate-pulse">
            {typingMessage}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-l-lg border-t border-l border-b border-gray-300 dark:bg-gray-700"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default AIChatSupport;
