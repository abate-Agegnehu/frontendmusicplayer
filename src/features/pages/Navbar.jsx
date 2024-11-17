/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { logoutUser } from "../user/userSlice";
import { space, color, typography, flexbox } from "styled-system";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    sessionStorage.removeItem("userEmail");
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <StyledNav>
      <Title>Music Collection</Title>
      <Hamburger onClick={toggleMenu}>☰</Hamburger>
      <NavLinks isOpen={isOpen}>
        <StyledLink to="/musiclist">Home</StyledLink>
        <StyledLink to="/myplaylist">My Playlist</StyledLink>
        <StyledLink to="/addsong">Add Song</StyledLink>
        <StyledLink to="/" onClick={handleLogout}>
          Log Out
        </StyledLink>
      </NavLinks>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  ${flexbox}
  ${space}
  ${color}
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background: linear-gradient(
    rgba(208, 164, 142, 0.4),
    rgba(197, 150, 123, 0.4),
    rgba(180, 137, 114, 0.05)
  );
  color: #4b5d46;
  position: sticky;
  top: 0;
  z-index: 1000;

  /* Add responsive styles */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  ${typography}
  margin: 0;
  font-size: 24px;
`;

const Hamburger = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;
  color: #fff;

  /* Show hamburger icon on small screens */
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  ${flexbox}
  display: flex;
  transition: max-height 0.3s ease;

  /* Make responsive menu */
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    max-height: ${({ isOpen }) =>
      isOpen ? "300px" : "0"}; /* Show/hide based on isOpen */
  }
`;

const StyledLink = styled(Link)`
  ${space}
  ${color}
  margin: 0 10px;
  color: #4b5d46;
  text-decoration: none;

  &:hover {
    color: #9e2a2f;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

export default Navbar;
