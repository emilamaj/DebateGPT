import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ChatThread from './ChatThread';
import MessageInputBar from './MessageInputBar';
import './DebatePage.css';

// Axios default url
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

// Split a rating into its comment and score
function splitRating(rating) {
  /* rating is in the form:
  COMMENT: <comment>
  SCORE: <score>
  */
  let split = rating.split("\n");
  let comment = split[0].split(": ")[1];
  let score = split[1].split(": ")[1];
  return { comment, score };
}


function DebatePage() {
  const [messages, setMessages] = useState([]);
  const [threadState, setThreadState] = useState("ready");
  const location = useLocation();
  const topic = location.state.topic;

  // UseEffect hook to run once on component mount
  React.useEffect(() => {
    const getInitialMessage = async () => {
      setThreadState("typing-ai");

      try {
        console.log('Getting initial welcome message from AI');
        const response = await axios.post('/api/ai-welcome', { topic, messages: [] });
        console.log('AI welcome msg:', response.data.aiResponse);
        setMessages([{ text: response.data.aiResponse, comment: "", note: "", byUser: false }]);
      } catch (error) {
        console.error('Error getting AI welcome message:', error);
      }
      setThreadState("ready");
    };
    getInitialMessage();
  }, [topic]);


  // Send request to register the user's message
  const handleUserMessage = async (message) => {

    // Register the user message
    let msgs = [...messages, { text: message, comment: "", note: "", byUser: true }];
    setMessages(msgs);

    // Add small random delay before sending message to AI
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 500));
    setThreadState("typing-ai");

    try {
      // Send request to rate the user's message and generate an AI response
      const response = await axios.post('/api/ai-response', { topic, messages: msgs });
      console.log('Registering user message:', message);
      console.log(response.data.userRating);
      console.log('AI response:', response.data.aiResponse);
      console.log(response.data.aiRating);

      // Replace last value in messages array with the new rating
      const userRating = splitRating(response.data.userRating);

      msgs[msgs.length - 1] = { text: message, comment: userRating.comment, note: userRating.score, byUser: true };

      // Add the AI response to the messages array
      const aiRating = splitRating(response.data.aiRating);
      msgs = [...msgs, { text: response.data.aiResponse, comment: aiRating.comment, note: aiRating.score, byUser: false }];

      // Update the state
      setMessages(msgs);
    } catch (error) {
      console.error('Error getting AI response:', error);
    }
    setThreadState("ready");
  };


  // Send request to generate the user's message
  const handleUserAuto = async () => {
    setThreadState("typing-user");

    // Add small random delay before sending message to AI
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 500));

    let generatedResponse = '';

    try {
      // Send request to generate an AI response
      const response = await axios.post('/api/ai-auto', { topic, messages });
      console.log('AI response:', response.data.autoResponse);
      generatedResponse = response.data.autoResponse;
    } catch (error) {
      console.error('Error getting AI response:', error);
    }
    setThreadState("ready");

    // Follow-up with regular AI response
    handleUserMessage(generatedResponse);
  };


  // Edit given message with new text
  const editMsg = (index, newText) => {
    const msgs = [...messages];
    msgs[index].text = newText;
    setMessages(msgs);
  };


  return (
    <div className="debate-page">
      <div className="app-header">
        <h1>DebateGPT on&nbsp;</h1>
        <h1 className='header-topic'>{topic}</h1>
      </div>
      <main className="chat-main">
        <ChatThread messages={messages} threadState={threadState} doEdit={(index, newText) => editMsg(index, newText)} />
      </main>
      <MessageInputBar onMessageSubmit={handleUserMessage} onMessageAuto={handleUserAuto} disabled={threadState !== "ready"} />
    </div>
  );
}

export default DebatePage;