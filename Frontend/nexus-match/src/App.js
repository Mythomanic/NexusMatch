import React from 'react';
import './App.css';
import Header from './Header';
import TinderCards from './TinderCards';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <Routes>
          <Route path="/chat" element={
            <div>
              <Header />
              <h1>Chat Screen</h1>
            </div>
          } />
          <Route path="/" element={
            <div>
              <TinderCards />
            </div>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;