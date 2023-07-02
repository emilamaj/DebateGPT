import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ChatThread from './ChatThread';
import MessageInputBar from './MessageInputBar';

function DebatePage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const topic = location.state.topic;

  const addMessage = (message, byUser) => {
    setMessages([...messages, { text: message, byUser }]);
  };

  const handleUserMessage = async (message) => {
    addMessage(message, true);
    setLoading(true);
    try {
      const response = await axios.post('/api/ai-response', { topic, messages, message });
      addMessage(response.data.aiResponse, false);
    } catch (error) {
      console.error('Error getting AI response:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    addMessage(`Let's debate about ${topic}`, false);
  }, [topic]);

  return (
    <div>
      <h1>Debate: {topic}</h1>
      <ChatThread messages={messages} />
      <MessageInputBar onMessageSubmit={handleUserMessage} disabled={loading} />
      {loading && <p>Loading AI response...</p>}
    </div>
  );
}

export default DebatePage;