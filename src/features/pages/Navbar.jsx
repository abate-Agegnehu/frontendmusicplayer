/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { space, color, typography, flexbox } from "styled-system";

const Navbar = () => (
  <StyledNav>
    <Title>Music Collection</Title>
    <NavLinks>
      <StyledLink to="/musiclist">Home</StyledLink>
      <StyledLink to="/myplaylist">My Playlist</StyledLink>
      <StyledLink to="/addsong">Add Song</StyledLink>
    </NavLinks>
  </StyledNav>
);

// Styled components with Styled System
const StyledNav = styled.nav`
  ${flexbox}
  ${space}
  ${color}
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background-color: #333;
  color: #fff;
`;

const Title = styled.h1`
  ${typography}
  margin: 0;
`;

const NavLinks = styled.div`
  ${flexbox}
  display: flex;
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
`;

export default Navbar;
