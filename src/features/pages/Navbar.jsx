import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to={"/musiclist"}>Home</Link>
      <Link to={"/addsong"}>Add Song</Link>
      <Link to={"/myplaylist"}>My Playlist</Link>
    </div>
  );
};

export default Navbar;
