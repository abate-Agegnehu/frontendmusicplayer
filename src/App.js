import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import MyPlayList from "./features/song/MyPlayList";
import SongForm from "./features/song/SongForm";
import EditSongs from "./features/song/EditSong";
import SongList from "./features/song/SongList";
import Navbar from "./features/pages/Navbar";
import Footer from "./features/pages/Footer";
import "./App.css";

const App = () => {
  return (
    <Router>
      
          <Routes>
            
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/musiclist"
              element={
                <>
                  <Navbar />
                  <SongList />
                  <Footer />
                </>
              }
            />
            <Route
              path="/myplaylist"
              element={
                <>
                  <Navbar />
                  <MyPlayList />
                  <Footer />
                </>
              }
            />
            <Route
              path="/addsong"
              element={
                <>
                  <Navbar />
                  <SongForm />
                  <Footer />
                </>
              }
            />
            <Route
              path="/editsong/:id"
              element={
                <>
                  <Navbar />
                  <EditSongs />
                  <Footer />
                </>
              }
            />
          </Routes>
    </Router>
  );
};

export default App;
