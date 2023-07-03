import React, { useEffect, useRef } from 'react';
import './ChatThread.css';

function ChatThread({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  // UseEffect hook to scroll to bottom of chat thread on every update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className="chat-thread">
      {messages.map((message, index) => (
        <p key={index} className={`message ${message.byUser ? 'user-message' : 'ai-message'}`}>
          {message.text}
        </p>
      ))}
      {isLoading && (
        <p className="message ai-message">
          <em>typing...</em>
        </p>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatThread;