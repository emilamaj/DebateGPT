import React from 'react';
import './ChatThread.css';

function ChatThread({ messages }) {
  return (
    <div className="chat-thread">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.byUser ? 'user-message' : 'ai-message'}`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}

export default ChatThread;