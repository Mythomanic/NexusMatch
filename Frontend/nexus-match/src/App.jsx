import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import JobCards from "./components/JobCards"; // İş ilanlarını gösterecek bileşen
import UserCards from "./components/UserCards"; // İş arayanların profillerini gösterecek bileşen
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
          <Route path="/find-jobs" element={<JobCards />} />{" "}
          {/* İş bulmak için */}
          <Route path="/find-workers" element={<UserCards />} />{" "}
          {/* İşçi/Çalışan bulmak için */}
          <Route
            path="/"
            element={
              <div>
                <h1>Welcome</h1>
                <nav>
                  <Link to="/find-jobs">İş Bulmak İçin</Link>
                  <Link to="/find-workers">İşçi/Çalışan Bulmak İçin</Link>
                </nav>
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
