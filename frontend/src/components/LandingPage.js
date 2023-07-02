import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LandingPage() {
  const [topic, setTopic] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleInputChange = (event) => {
    setTopic(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (topic.trim() === '') {
      setError('Please enter a debate topic.');
    } else {
      history.push({
        pathname: '/debate',
        state: { topic: topic }
      });
    }
  };

  return (
    <div>
      <h1>Welcome to the AI Debate</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={topic}
          onChange={handleInputChange}
          placeholder="Enter a debate topic"
        />
        <button type="submit">Start Debate</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LandingPage;