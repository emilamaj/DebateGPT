import React from 'react';
import './ChatThread.css';

function ChatThread({ messages, isLoading }) {
  return (
    <div className="chat-thread">
      {messages.map((message, index) => (
        <p
          key={index}
          className={`message ${message.byUser ? 'user-message' : 'ai-message'}`}
        >
          {message.text}
        </p>
      ))}
      {isLoading && (
        <div className="message ai-message">
        </div>
      )}
    </div>
  );
}

export default ChatThread;