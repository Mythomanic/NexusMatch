import React from "react";
import "./Header.css";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import LinkIcon from "@mui/icons-material/Link";
import IconButton from "@mui/material/IconButton";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

function Header() {
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
      <IconButton
        variant="contained"
        color="white"
        href="/profile"
        className="header__icon"
      >
        <AccountBoxIcon />
      </IconButton>
    </div>
  );
}

export default Header;
