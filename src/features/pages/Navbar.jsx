/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background-color: #333;
  color: #fff;
`;

const LinksContainer = styled.div`
  display: flex;
`;

const NavbarLink = styled(Link)`
  margin: 0 10px;
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => (
  <NavbarContainer>
    <h1>Music Collection</h1>
    <LinksContainer>
      <NavbarLink to="/musiclist">Home</NavbarLink>
      <NavbarLink to="/myplaylist">My Playlist</NavbarLink>
      <NavbarLink to="/addsong">Add Song</NavbarLink>
    </LinksContainer>
  </NavbarContainer>
);

export default Navbar;
