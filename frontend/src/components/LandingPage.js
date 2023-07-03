import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [topic, setTopic] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setTopic(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (topic.trim() === '') {
      setError('Please enter a debate topic.');
    } else {
      navigate('/debate', { state: { topic: topic } });
    }
  };

  return (
    <div className="landing-page">
      <header className="app-header">
        <h1>DebateGPT</h1>
        <p>Enter a debate topic to start a debate with the AI.</p>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="topic-form">
          <input
            type="text"
            value={topic}
            onChange={handleInputChange}
            placeholder="Enter a debate topic"
            className="topic-input"
          />
          <button type="submit" className="submit-button">Start Debate</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </main>
    </div>
  );
}

export default LandingPage;