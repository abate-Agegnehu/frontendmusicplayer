import React from "react";
import styled from "@emotion/styled";

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterText>© 2024 Music Collection. All rights reserved.</FooterText>
      </FooterContainer>
    </>
  );
};


const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5em;
  background: #f7f3f0;
  color: #575a5c;
  border-top: 1px solid #ddd;
  margin-top:100px;
  position: fixed;
  bottom: 0;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 1em;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    padding: 0.8em;
    font-size: 12px;
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export default Footer;
