import React, { useState } from 'react';
import './MessageInputBar.css';

function MessageInputBar({ onMessageSubmit, disabled }) {
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== '') {
      onMessageSubmit(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        disabled={disabled}
        placeholder="Your message..."
        className="message-input"
      />
      <button type="submit" disabled={disabled} className="message-submit-button">
        Send
      </button>
    </form>
  );
}

export default MessageInputBar;