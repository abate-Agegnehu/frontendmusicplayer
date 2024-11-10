/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { space, color, typography, flexbox } from "styled-system";

// Responsive Navbar component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <StyledNav>
      <Title>Music Collection</Title>
      <Hamburger onClick={toggleMenu}>☰</Hamburger>
      <NavLinks isOpen={isOpen}>
        <StyledLink to="/musiclist">Home</StyledLink>
        <StyledLink to="/myplaylist">My Playlist</StyledLink>
        <StyledLink to="/addsong">Add Song</StyledLink>
        <StyledLink to="/">Log Out</StyledLink>
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
  background-color: #333;
  color: #fff;
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
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #ccc;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

export default Navbar;
