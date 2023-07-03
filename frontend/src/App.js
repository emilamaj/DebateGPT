import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DebatePage from './components/DebatePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/debate" element={<DebatePage />} />
      </Routes>
    </Router>
  );
}

export default App;