import React, { useState, useEffect } from "react";
import jobService from "../services/jobService";
import { useNavigate, useParams } from "react-router-dom";
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

const UpdateJob = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [requirements, setRequirements] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const job = await jobService.getJobById(id);
        setTitle(job.title);
        setDescription(job.description);
        setLocation(job.location);
        setSalary(job.salary);
        setRequirements(job.requirements);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jobData = {
      title,
      description,
      location,
      salary,
      requirements,
    };

    try {
      setError(null);
      await jobService.updateJob(id, jobData);
      navigate("/"); 
    } catch (error) {
      setError("Job update failed. Please try again.");
      console.error("Job update error:", error);
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
          <Avatar sx={{ m: 1, bgcolor: "#256dd9" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: "#37657F" }}>
            Update Job
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
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
              label="Job Title"
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
              label="Job Description"
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
              id="salary"
              label="Salary"
              name="salary"
              autoComplete="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
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
              Update Job
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UpdateJob;
