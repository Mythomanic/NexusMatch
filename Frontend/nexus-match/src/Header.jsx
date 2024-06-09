import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import LinkIcon from "@mui/icons-material/Link";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import authService from "./services/authService";

function Header({ showSnackbar }) {
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
    <div className="header">
      <IconButton onClick={handleProfileClick}>
        <h3>Profile</h3>
        <PersonIcon className="header__icon" />
      </IconButton>
      <IconButton onClick={handleCreateJobClick}>
        <h4>Create job</h4>
        <LinkIcon className="header__icon" />
      </IconButton>
      <IconButton>
        <ChatIcon className="header__icon" />
      </IconButton>
      <IconButton onClick={handleLogout}>
        <h3>Logout</h3>
        <LogoutIcon className="header__icon" />
      </IconButton>
      <nav>
        <Link to="/find-jobs">İş Bulmak İçin</Link>
        <Link to="/find-workers">İşçi/Çalışan Bulmak İçin</Link>
      </nav>
    </div>
  );
}

export default Header;
