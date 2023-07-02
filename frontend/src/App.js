import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DebatePage from './components/DebatePage';
import ErrorNotification from './components/ErrorNotification';

function App() {
  const [debateTopic, setDebateTopic] = useState(''); // The current debate topic
  const [messages, setMessages] = useState([]); // The list of messages in the current debate
  const [error, setError] = useState(null); // Any error messages to display

  // Function to handle starting a new debate
  const startDebate = async (topic) => {
    try {
      const response = await fetch('/api/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic })
      });

      if (!response.ok) {
        throw new Error('Failed to start debate');
      }

      const data = await response.json();

      setDebateTopic(data.topic);
      setMessages(data.messages);
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to handle sending a new message in the debate
  const sendMessage = async (message) => {
    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      setMessages(data.messages);
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to clear any error messages
  const clearError = () => {
    setError(null);
  };

  return (
    <Router>
      <div>
        <ErrorNotification error={error} onDismiss={clearError} />
        <Routes>
          <Route path="/debate">
            <DebatePage messages={messages} onMessageSend={sendMessage} />
          </Route>
          <Route path="/">
            <LandingPage onDebateStart={startDebate} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;