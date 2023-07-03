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

  // UseEffect hook to run once on component mount
  React.useEffect(() => {
    const getInitialMessage = async () => {
      setLoading(true);

      try {
        console.log('Getting initial welcome message from AI');
        const response = await axios.post('http://localhost:8000/api/ai-welcome', { topic, messages: [] });
        console.log('AI welcome msg:', response.data.aiResponse);
        setMessages([{ text: response.data.aiResponse, byUser: false }]);
      } catch (error) {
        console.error('Error getting AI welcome message:', error);
      }
      setLoading(false);
    };
    getInitialMessage();
  }, []);

  const handleUserMessage = async (message) => {
    // Register the user message
    let msgs = [...messages, { text: message, byUser: true }]
    setMessages(msgs);

    // Add small random delay before sending message to AI
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 500));

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
        <h1>DebateGPT on</h1>
        <h1 className='header-topic'>{topic}</h1>
      </header>
      <main className="chat-main">
        <ChatThread messages={messages} isLoading={loading} />
      </main>
      <MessageInputBar onMessageSubmit={handleUserMessage} disabled={loading} />
    </div>
  );
}

export default DebatePage;