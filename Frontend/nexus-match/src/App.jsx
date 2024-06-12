import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import SimpleNavbar from "./Header"; // Updated to point to your new SimpleNavbar component
import JobCards from "./components/JobCards"; // İş ilanlarını gösterecek bileşen
import UserCards from "./components/UserCards"; // İş arayanların profillerini gösterecek bileşen
import Login from "./components/Login";
import Register from "./components/Register";
import CreateJob from "./components/CreateJob";
import Profile from "./components/Profile";
import MyJobs from "./components/MyJobs"; // MyJobs bileşeni
import { Snackbar, Alert } from "@mui/material";
import Applicants from "./components/Applicants";
import Chats from "./components/Chats";
import Chat from "./components/Chat"; // Import the new Chat component
import LandingPage from "./components/LandingPage"; // Import the new LandingPage component

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const userId = "your-user-id"; // Kullanıcının ID'sini buraya ekleyin

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
        <HeaderWrapper showSnackbar={showSnackbar} userId={userId} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/find-jobs" element={<JobCards />} />
          <Route path="/find-workers" element={<UserCards />} />
          <Route path="/my-jobs" element={<MyJobs userId={userId} />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/applicants/:jobId" element={<Applicants />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chat/:chatId" element={<Chat />} />{" "}
          {/* Add this route */}
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
      {console.log(userId)}
    </div>
  );
}

function HeaderWrapper({ showSnackbar, userId }) {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/register"];

  if (hideHeaderPaths.includes(location.pathname)) {
    return null;
  }

  return <SimpleNavbar showSnackbar={showSnackbar} userId={userId} />;
}

export default App;
