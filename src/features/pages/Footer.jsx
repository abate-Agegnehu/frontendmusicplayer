import React from "react";

const Footer = () => (
  <footer style={styles.footer}>
    <p>&copy; 2024 Music Collection App</p>
  </footer>
);

const styles = {
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    padding: "1em",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
  },
};

export default Footer;
