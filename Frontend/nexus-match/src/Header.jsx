import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import {
  Person as PersonIcon,
  Chat as ChatIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import authService from "./services/authService";
import logo from "./assets/nexuslogo.png"; // Import the logo image
import { GiSelfLove } from "react-icons/gi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { MdEvent } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Work+Sans:400,600');

  body {
    margin: 0;
    background: linear-gradient(to right, #ffffff, #e6f0f5);
    font-family: 'Work+Sans', sans-serif;
    font-weight: 800;
  }
`;

const NavbarContainer = styled.nav`
  background: black;
  padding: 10px 0;
  &::after {
    content: "";
    display: table;
    clear: both;
  }
`;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  float: left;
  padding: 10px 0;
  img {
    width: 120px;
    height: 80px;
    object-fit: contain;
  }
`;

const Nav = styled.ul`
  float: right;
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 70px;
  padding-top: 23px;
  position: relative;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 18px;
  &:hover {
    color: grey;
  }
  &::before {
    content: "";
    display: block;
    height: 5px;
    background-color: #5f757f;
    position: absolute;
    top: 0;
    width: 0%;
    transition: all ease-in-out 250ms;
  }
  &:hover::before {
    width: 100%;
  }
`;

const NavDropdown = styled.div`
  position: relative;
  display: inline-block;
  &:hover .dropdown-content {
    display: block;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #ddd;
  }
`;

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

  return (
    <>
      <GlobalStyle />
      <NavbarContainer>
        <Container>
          <Logo>
            <NavLink to="/">
              <img src={logo} alt="Nexus Match" />
            </NavLink>
          </Logo>
          <Nav>
            <NavItem>
              <NavLink to="/chats">
                <IoChatboxEllipsesOutline />
                Chats
              </NavLink>
            </NavItem>
            <NavItem>
              <NavDropdown>
                <NavLink to="#">
                  <MdEvent />
                  Event
                </NavLink>
                <DropdownContent className="dropdown-content">
                  <DropdownItem to="/find-events">
                    <PersonIcon /> Find Events
                  </DropdownItem>
                  <DropdownItem to="/my-events">
                    <PersonIcon /> My Events
                  </DropdownItem>
                  <DropdownItem to="/create-event">
                    <LogoutIcon /> Create Event
                  </DropdownItem>
                </DropdownContent>
              </NavDropdown>
            </NavItem>
            <NavItem>
              <NavDropdown>
                <NavLink
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  to="#"
                >
                  <MdOutlineBusinessCenter />
                  Job
                </NavLink>
                <DropdownContent className="dropdown-content">
                  <DropdownItem to="/find-jobs">
                    <PersonIcon /> Find Jobs
                  </DropdownItem>
                  <DropdownItem to="/my-jobs">
                    <PersonIcon /> My Jobs
                  </DropdownItem>
                  <DropdownItem to="/create-job">
                    <LogoutIcon /> Create Job
                  </DropdownItem>
                </DropdownContent>
              </NavDropdown>
            </NavItem>
            <NavItem>
              <NavDropdown>
                <NavLink to="#">
                  <GiSelfLove />
                  Date
                </NavLink>
                <DropdownContent className="dropdown-content">
                  <DropdownItem to="/find-dates">
                    <PersonIcon /> Find Dates
                  </DropdownItem>
                  <DropdownItem to="/my-dates">
                    <PersonIcon /> My Dates
                  </DropdownItem>
                  <DropdownItem to="/create-date">
                    <LogoutIcon /> Create Date
                  </DropdownItem>
                </DropdownContent>
              </NavDropdown>
            </NavItem>
            <NavItem>
              <NavDropdown>
                <NavLink to="#">
                  <IoMdSettings />
                  Settings
                </NavLink>
                <DropdownContent className="dropdown-content">
                  <DropdownItem to="/profile">
                    <PersonIcon /> Profile
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>
                    <LogoutIcon /> Logout
                  </DropdownItem>
                </DropdownContent>
              </NavDropdown>
            </NavItem>
          </Nav>
        </Container>
      </NavbarContainer>
    </>
  );
}

export default SimpleNavbar;
