import React, { useEffect, useRef, useState } from 'react';
import './ChatThread.css';

function ChatThread({ messages, threadState, doEdit }) {
  // Save message being edited
  const [edit, setEdit] = useState(null);
  const editRef = useRef(null);
  
  // UseEffect hook to scroll to bottom of chat thread on every update
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className="chat-thread">
      {messages.map((message, index) => (
        <p ref={edit === index ? editRef : null}
        onClick={()=>{
          if (threadState === 'ready') {
            setEdit(index);
          }
        }} 
        contentEditable={edit === index ? 'true' : 'false'}
        onBlur={(event)=>{
          setEdit(null);
          doEdit(index, event.target.innerText);
        }}

        key={index} className={`message ${message.byUser ? 'user-message' : 'ai-message'} ${
          edit === index ? 'message-edition' : ''
        }`}>
          {message.text}
        </p>
      ))}
      {threadState === 'typing-ai' && (
        <p className="message ai-message">
          <em>typing...</em>
        </p>
      )}
      {threadState === 'typing-user' && (
        <p className="message user-message">
          <em>typing...</em>
        </p>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatThread;