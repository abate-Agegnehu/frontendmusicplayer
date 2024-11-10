import React from "react";
import styled from "@emotion/styled";

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2024 Music Collection. All rights reserved.</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3em;
  background-color: #333;
  color: #fff;
`;

export default Footer;
