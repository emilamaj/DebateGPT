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
      <div className="landing-box">
        <header className="landing-header">
          <h1 className="landing-header-title">DebateGPT</h1>
          <p className="landing-header-subtitle">Debate me on any topic</p>
        </header>
        <main>
          <form onSubmit={handleSubmit} className="topic-form">
            <input
              type="text"
              value={topic}
              onChange={handleInputChange}
              placeholder="The existence of aliens"
              className="topic-input"
            />
            <button type="submit" className="submit-button">Start Debate</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </main>
      </div>
    </div>
  );
}

export default LandingPage;