/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1em;
  background-color: #333;
  color: #fff;
  text-align: center;
`;

const Footer = () => (
  <FooterContainer>
    <p>&copy; 2024 Music Collection App</p>
  </FooterContainer>
);

export default Footer;
