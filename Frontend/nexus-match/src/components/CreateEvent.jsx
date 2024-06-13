import React, { useState, useEffect } from "react";
import eventService from "../services/eventService";
import authService from "../services/authService";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [requirements, setRequirements] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user && user.token) {
      setUserId(user.id);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventData = {
      title,
      description,
      location,
      date,
      requirements,
    };

    try {
      setError(null);
      setSuccessMessage(null);
      await eventService.createEvent(eventData);
      setSuccessMessage("Event created successfully!");
      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
      setRequirements("");
    } catch (error) {
      setError("Event creation failed. Please try again.");
      console.error("Event creation error:", error);
    }
  };

  const handleNavigateToMyEvents = () => {
    navigate("/my-events");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#256dd9" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{ color: "#37657F" }}
              >
                Create Event
              </Typography>
              {error && <Typography color="error">{error}</Typography>}
              {successMessage && (
                <Typography color="primary">{successMessage}</Typography>
              )}
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Event Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Event Description"
                  name="description"
                  autoComplete="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="date"
                  label="Date"
                  name="date"
                  type="date"
                  autoComplete="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="requirements"
                  label="Requirements"
                  name="requirements"
                  autoComplete="requirements"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#37657F" }}
                >
                  Create Event
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mt: 8 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#37657F" }}
                onClick={handleNavigateToMyEvents}
              >
                View My Events
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default CreateEvent;
