import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  CssBaseline,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nexus Match
          </Typography>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
          <Button color="inherit" component={RouterLink} to="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Nexus Match
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"Your one-stop solution for finding jobs and employees."}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/login"
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={RouterLink}
            to="/register"
          >
            Register
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default LandingPage;
