import React from 'react';

function ChatThread({ messages }) {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index} style={{ textAlign: message.byUser ? 'right' : 'left' }}>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatThread;