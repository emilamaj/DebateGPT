import React, { useState } from 'react';
import './MessageInputBar.css';
import IconSend from './IconSend';
import IconAuto from './IconAuto';

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
      <button type="submit" title="Send message" disabled={disabled} className="message-button message-button-submit">
        <IconSend />
      </button>

      <button type="button" title="Auto-generate message" disabled={disabled} onClick={onMessageAuto} className="message-button message-button-auto">
        <IconAuto />
      </button>
    </form>
  );
}

export default MessageInputBar;