import React, { useEffect, useState } from "react";
import authService from "../services/authService";

const HomePage = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setUserName(user.name);
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {userName}</h1>
      <p>The most fun way to find a job.</p>
    </div>
  );
};

export default HomePage;
