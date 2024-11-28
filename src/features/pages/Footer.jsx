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
  padding: 2em; /* Increased padding for better spacing */
  background: #f7f3f0; /* Fixed color syntax */
  color: #575a5c;
  border-top: 1px solid #ddd; /* Optional: Add a subtle border for separation */
  bottom: 0;
  width: 100%;

  /* Responsive text alignment */
  @media (max-width: 768px) {
    text-align: center;
    font-size: 14px; /* Adjust font size for smaller screens */
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 16px; /* Slightly larger font for readability */
  font-weight: 400; /* Adjust font weight for a clean appearance */
`;

export default Footer;
