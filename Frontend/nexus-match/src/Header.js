import React from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="header">
      <IconButton>
        <PersonIcon className="header__icon" />
      </IconButton>
      <IconButton>
        <LinkIcon className="header__icon" fontSize="large" />
      </IconButton>
      <IconButton>
        <ChatIcon className="header__icon" />
      </IconButton>
      <IconButton onClick={handleLogout}>
        <LogoutIcon className="header__icon" />
      </IconButton>
    </div>
  );
}

export default Header;
