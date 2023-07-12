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
				<div ref={edit === index ? editRef : null}
					onClick={() => {
						if (threadState === 'ready') {
							setEdit(index);
						}
					}}
					contentEditable={edit === index ? 'true' : 'false'}
					onBlur={(event) => {
						setEdit(null);
						doEdit(index, event.target.innerText);
					}}

					key={index} className={`message ${message.byUser ? 'user-message' : 'ai-message'} ${edit === index ? 'message-edition' : ''
						}`}>
					<p className='message-content'>{message.text}</p>
					{message.comment && (
						<p className='message-comment'>&gt;{message.comment}&nbsp;</p>
					)}
					{message.note && (
						<p className='message-note'>{message.note + "/10"}</p>
					)}
				</div>

			))}
			{threadState === 'typing-ai' && (
				<div className="message ai-message">
					<em>typing...</em>
				</div>
			)}
			{threadState === 'typing-user' && (
				<div className="message user-message">
					<em>typing...</em>
				</div>
			)}
			<div ref={messagesEndRef} />
		</div>
	);
}

export default ChatThread;