import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import LinkIcon from "@mui/icons-material/Link";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, Link } from "react-router-dom";
import authService from "./services/authService";
import "./Header.css";

function SimpleNavbar({ showSnackbar, userId }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleOpenNavMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LOGO
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button color="inherit" component={Link} to="/find-jobs">
            İş Bulmak İçin
          </Button>
          <Button color="inherit" component={Link} to="/find-workers">
            İşçi/Çalışan Bulmak İçin
          </Button>
          <Button color="inherit" component={Link} to="/my-jobs">
            My Jobs
          </Button>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            <MenuItem
              onClick={handleCloseNavMenu}
              component={Link}
              to="/find-jobs"
            >
              İş Bulmak İçin
            </MenuItem>
            <MenuItem
              onClick={handleCloseNavMenu}
              component={Link}
              to="/find-workers"
            >
              İşçi/Çalışan Bulmak İçin
            </MenuItem>
            <MenuItem
              onClick={handleCloseNavMenu}
              component={Link}
              to="/my-jobs"
            >
              My Jobs
            </MenuItem>
          </Menu>
        </Box>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleProfileClick}>
            <PersonIcon className="header__icon" />
            Profile
          </MenuItem>
          <MenuItem onClick={handleCreateJobClick}>
            <LinkIcon className="header__icon" />
            Create job
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon className="header__icon" />
            Logout
          </MenuItem>
        </Menu>
        <IconButton>
          <ChatIcon className="header__icon" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default SimpleNavbar;
