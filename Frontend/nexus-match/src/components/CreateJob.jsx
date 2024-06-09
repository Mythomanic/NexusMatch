import React, { useState, useEffect } from "react";
import jobService from "../services/jobService";
import authService from "../services/authService";
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

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [requirements, setRequirements] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user && user.token) {
      setUserId(user.id);
      fetchJobs(user.id);
    }
  }, []);

  const fetchJobs = async (userId) => {
    try {
      const response = await jobService.getJobsByUser(userId);
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]); // Ensure jobs is always an array
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jobData = {
      title,
      description,
      location,
      salary,
      requirements,
      position, // Include position in the request
    };

    try {
      setError(null);
      setSuccessMessage(null);
      await jobService.createJob(jobData);
      setSuccessMessage("Job created successfully!");
      setTitle("");
      setDescription("");
      setLocation("");
      setSalary("");
      setRequirements("");
      setPosition(""); // Clear the position input
      fetchJobs(userId); // Refresh the job list
    } catch (error) {
      setError("Job creation failed. Please try again.");
      console.error("Job creation error:", error);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await jobService.deleteJob(jobId);
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleUpdate = async (jobId, updatedJob) => {
    try {
      await jobService.updateJob(jobId, updatedJob);
      fetchJobs(userId); // Refresh the job list
    } catch (error) {
      console.error("Error updating job:", error);
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
            Create Job
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="position"
              label="Position"
              name="position"
              autoComplete="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Job
            </Button>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Typography component="h2" variant="h6">
              Your Jobs
            </Typography>
            {Array.isArray(jobs) && jobs.length > 0 ? (
              jobs.map((job) => (
                <Box key={job.id} sx={{ mt: 2 }}>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography>{job.description}</Typography>
                  <Typography>{job.location}</Typography>
                  <Typography>{job.salary}</Typography>
                  <Typography>{job.requirements}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1, mr: 1 }}
                    onClick={() =>
                      handleUpdate(job.id, {
                        title: job.title,
                        description: job.description,
                        location: job.location,
                        salary: job.salary,
                        requirements: job.requirements,
                        position: job.position,
                      })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 1 }}
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </Button>
                </Box>
              ))
            ) : (
              <Typography>No jobs available</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateJob;
