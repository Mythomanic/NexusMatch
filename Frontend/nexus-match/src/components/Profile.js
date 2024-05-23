import React, { useState, useEffect } from "react";
import profileService from "../services/profileService";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setUserId(user.id);
      setName(user.name);
      setEmail(user.email);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleNameUpdate = async () => {
    try {
      await profileService.updateName(userId, name);
      setMessage("Name updated successfully");
    } catch (error) {
      setMessage("Failed to update name");
    }
  };

  const handleEmailUpdate = async () => {
    try {
      await profileService.updateEmail(userId, email);
      setMessage("Email updated successfully");
    } catch (error) {
      setMessage("Failed to update email");
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      await profileService.updatePassword(userId, password);
      setMessage("Password updated successfully");
    } catch (error) {
      setMessage("Failed to update password");
    }
  };

  const handleAddTag = async () => {
    try {
      await profileService.addTag(userId, tag);
      setMessage("Tag added successfully");
    } catch (error) {
      setMessage("Failed to add tag");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          {message && <Typography color="primary">{message}</Typography>}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={handleNameUpdate}
            >
              Update Name
            </Button>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={handleEmailUpdate}
            >
              Update Email
            </Button>
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={handlePasswordUpdate}
            >
              Update Password
            </Button>
            <TextField
              margin="normal"
              fullWidth
              id="tag"
              label="Tag"
              name="tag"
              autoComplete="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={handleAddTag}
            >
              Add Tag
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
