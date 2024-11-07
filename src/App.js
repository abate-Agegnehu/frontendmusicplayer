import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import SongForm from "./features/song/SongForm";
import SongList from "./features/song/SongList";
import EditSong from "./features/song/EditSong";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/Signup";
import { getIsAuthenticated } from "./features/user/userSlice";
import MyPlayList from "./features/song/MyPlayList";
function App() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  console.log(isAuthenticated);
  return (
    <Router>
      <h1>Music Manager</h1>
      <Routes>
        <Route path="/musiclist" element={<SongList />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addsong" element={<SongForm />} />
        <Route path="/editsong/:id" element={<EditSong />} />
        <Route path="/myplaylist" element={<MyPlayList />} />
      </Routes>
    </Router>
  );
}

export default App;
