import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import TinderCards from "./TinderCards";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateJob from "./components/CreateJob";
import Profile from "./components/Profile";
import { Snackbar, Alert } from "@mui/material";

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="app">
      <Router>
        <Header showSnackbar={showSnackbar} />
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Router>
    </div>
  );
}

export default App;
