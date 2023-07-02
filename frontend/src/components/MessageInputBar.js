import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        disabled={disabled}
        placeholder="Type your message here"
      />
      <button type="submit" disabled={disabled}>Submit</button>
    </form>
  );
}

export default MessageInputBar;