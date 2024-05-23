import React from "react";
import "./App.css";
import Header from "./Header";
import TinderCards from "./TinderCards";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateJob from "./components/CreateJob";
import UpdateJob from "./components/UpdateJob";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <Routes>
          <Route
            path="/chat"
            element={
              <div>
                <Header />
                <h1>Chat Screen</h1>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/update-job/:id" element={<UpdateJob />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/"
            element={
              <div>
                <TinderCards />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
