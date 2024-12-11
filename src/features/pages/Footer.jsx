import React from "react";
import styled from "@emotion/styled";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 Music Collection. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em; 
  background: #f7f3f0;
  color: #575a5c;
  border-top: 1px solid #ddd;
  bottom: 0;
  width: 100%;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 14px; 
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 400; 
`;

export default Footer;
