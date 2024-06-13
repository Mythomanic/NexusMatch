import React, { useState, useEffect } from "react";
import dateService from "../services/dateService";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const CreateDate = () => {
  const [title, setTitle] = useState("");
  const [ownGender, setOwnGender] = useState("Male");
  const [desiredGender, setDesiredGender] = useState("Female");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
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
    const dateData = {
      title,
      ownGender,
      desiredGender,
      description,
      location,
    };

    try {
      setError(null);
      setSuccessMessage(null);
      await dateService.createDate(dateData);
      setSuccessMessage("Date created successfully!");
      setTitle("");
      setOwnGender("Male");
      setDesiredGender("Female");
      setDescription("");
      setLocation("");
    } catch (error) {
      setError("Date creation failed. Please try again.");
      console.error("Date creation error:", error);
    }
  };

  const handleNavigateToMyDates = () => {
    navigate("/my-dates");
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
                Create Date
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
                  label="Date Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Your Gender</InputLabel>
                  <Select
                    value={ownGender}
                    onChange={(e) => setOwnGender(e.target.value)}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Desired Gender</InputLabel>
                  <Select
                    value={desiredGender}
                    onChange={(e) => setDesiredGender(e.target.value)}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Description"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#37657F" }}
                >
                  Create Date
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mt: 8 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#37657F" }}
                onClick={handleNavigateToMyDates}
              >
                View My Dates
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default CreateDate;
