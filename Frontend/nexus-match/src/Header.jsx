import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import {
  Person as PersonIcon,
  Chat as ChatIcon,
  Link as LinkIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import authService from "./services/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

function SimpleNavbar({ showSnackbar, userId }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      showSnackbar("Logout successful!", "success");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      showSnackbar("Logout failed!", "error");
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleCreateJobClick = () => {
    navigate("/create-job");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Nexus Match
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-white fw-bold " as={Link} to="/find-jobs">
              İş Bulmak İçin
            </Nav.Link>
            <Nav.Link
              className="text-white fw-bold "
              as={Link}
              to="/find-workers"
            >
              Çalışan Bulmak İçin
            </Nav.Link>
            <Nav.Link className="text-white fw-bold " as={Link} to="/my-jobs">
              My Jobs
            </Nav.Link>
            <Nav.Link
              className="text-white fw-bold "
              as={Link}
              to="/create-job"
            >
              Create Job
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleProfileClick}>
                <PersonIcon className="header__icon" /> Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                <LogoutIcon className="header__icon" /> Logout
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
              <ChatIcon className="header__icon" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SimpleNavbar;
