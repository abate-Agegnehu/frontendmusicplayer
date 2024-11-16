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
  background: linear-gradient(
    rgba(208, 164, 142, 0.1),
    rgba(197, 150, 123, 1),
    rgba(180, 137, 114, 0.1)
  );
  color: #fff;
`;

export default Footer;
