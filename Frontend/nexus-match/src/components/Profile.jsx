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
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user && user.token) {
      setUserId(user.id);
      profileService
        .getJobProfile(user.id)
        .then((profile) => {
          setName(profile.name);
          setEmail(profile.email);
          setTags(profile.tagsJob || []);
          setAvatar(profile.avatarJob);
        })
        .catch(console.error);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleUpdate = async (updateData) => {
    try {
      await profileService.updateUserProfile(userId, updateData);
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage("Failed to update profile");
    }
  };

  const handleNameUpdate = () => {
    handleUpdate({ name });
  };

  const handleEmailUpdate = () => {
    handleUpdate({ email });
  };

  const handlePasswordUpdate = () => {
    handleUpdate({ password, password_confirmation: passwordConfirmation });
  };

  const handleAddTag = async () => {
    try {
      await handleUpdate({ tagJob: tag });
      setTags((prevTags) => [...prevTags, tag]);
      setTag("");
    } catch (error) {
      setMessage("Failed to add tag");
    }
  };

  const handleRemoveTag = async (tagToRemove) => {
    try {
      await handleUpdate({ removeTagJob: tagToRemove });
      setTags((prevTags) => prevTags.filter((t) => t !== tagToRemove));
      setMessage("Tag removed successfully");
    } catch (error) {
      setMessage("Failed to remove tag");
    }
  };

  const handleAvatarUpload = async () => {
    const formData = new FormData();
    formData.append("avatarJob", selectedAvatar);

    try {
      const response = await profileService.updateUserAvatar(userId, formData);
      setAvatar(response.avatarJob);
      setMessage("Avatar updated successfully");
    } catch (error) {
      setMessage("Failed to update avatar");
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
          {avatar && (
            <img
              src={`https://nexusmain.onrender.com/storage/avatars/${avatar}`}
              alt="Avatar"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          )}
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
            <TextField
              margin="normal"
              fullWidth
              name="passwordConfirmation"
              label="Confirm Password"
              type="password"
              id="passwordConfirmation"
              autoComplete="new-password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
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
            <div>
              {tags.length > 0 ? (
                tags.map((t) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      margin="normal"
                      fullWidth
                      id="tags"
                      label="Tags"
                      name="tags"
                      autoComplete="tags"
                      value={t}
                      disabled
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemoveTag(t)}
                    >
                      Remove
                    </Button>
                  </div>
                ))
              ) : (
                <Typography>No tags available</Typography>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedAvatar(e.target.files[0])}
            />
            <Button
              fullWidth
              variant="contained"
              component="label"
              sx={{ mt: 2, mb: 2 }}
              onClick={handleAvatarUpload}
            >
              Save Avatar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
