import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ChatThread from './ChatThread';
import MessageInputBar from './MessageInputBar';
import './DebatePage.css';

function DebatePage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const topic = location.state.topic;

  const handleUserMessage = async (message) => {
    let msgs = [...messages, { text: message, byUser: true }]
    setMessages(msgs);
    setLoading(true);
    try {
      console.log('Sending messages to AI. New msg:', message);
      const response = await axios.post('http://localhost:8000/api/ai-response', { topic, messages: msgs });
      console.log('AI response:', response.data.aiResponse);
      msgs = [...msgs, { text: response.data.aiResponse, byUser: false }]
      setMessages(msgs);
    } catch (error) {
      console.error('Error getting AI response:', error);
    }
    setLoading(false);
  };

  return (
    <div className="debate-page">
      <header className="app-header">
        <h1>Debate on: {topic}</h1>
      </header>
      <main className="chat-main">
        <ChatThread messages={messages} />
      </main>
      <MessageInputBar onMessageSubmit={handleUserMessage} disabled={loading} />
      {loading && <p>Loading AI response...</p>}
    </div>
  );
}

export default DebatePage;