import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={styles.navbar}>
    <h1>Music Collection</h1>
    <div>
      <Link to="/musiclist" style={styles.link}>
        Home
      </Link>
      <Link to="/myplaylist" style={styles.link}>
        My Playlist
      </Link>
      <Link to="/addsong" style={styles.link}>
        Add Song
      </Link>
    </div>
  </nav>
);

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1em",
    backgroundColor: "#333",
    color: "#fff",
  },
  link: {
    margin: "0 10px",
    color: "#fff",
    textDecoration: "none",
  },
};

export default Navbar;
