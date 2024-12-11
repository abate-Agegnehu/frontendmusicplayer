/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { logoutUser } from "../user/userSlice";
import { space, color, typography, flexbox } from "styled-system";

const Navbar = () => {
  const [isAnimating, setIsAnimating] = useState(false); 
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    sessionStorage.removeItem("userEmail");
    dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <StyledNav isAnimating={isAnimating}>
      <Title>Music Collections</Title>
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
  padding: 1.5em;
  background: #fff;
  color: #575a5c;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: transform 0.4s ease-in-out; 
  transform: ${({ isAnimating }) =>
    isAnimating ? "translateY(-10px)" : "translateY(0)"};

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

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  ${flexbox}
  display: flex;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease;
  }
`;

const StyledLink = styled(Link)`
  ${space}
  ${color}
  margin: 16px 10px;
  color: #575a5c;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #9e2a2f;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

export default Navbar;
