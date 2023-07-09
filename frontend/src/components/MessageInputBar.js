import React, { useState } from 'react';
import './MessageInputBar.css';

function MessageInputBar({ onMessageSubmit, onMessageAuto, disabled }) {
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
      <button type="submit" disabled={disabled} className="message-button message-button-submit">
        Send
      </button>

      <input type="button" value="Auto" onClick={onMessageAuto} disabled={disabled} className="message-button message-button-auto" />
    </form>
  );
}

export default MessageInputBar;