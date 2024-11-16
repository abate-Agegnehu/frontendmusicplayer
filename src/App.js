/** @jsxImportSource @emotion/react */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { css } from "@emotion/react";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import MyPlayList from "./features/song/MyPlayList";
import SongForm from "./features/song/SongForm";
import EditSongs from "./features/song/EditSong";
import SongList from "./features/song/SongList";
import Navbar from "./features/pages/Navbar";
import Footer from "./features/pages/Footer";

const appStyles = css`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    rgba(208, 164, 142, 1),
    rgba(197, 150, 123, 0.1),
    rgba(180, 137, 114, 1) 
  );
  color: white;
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  opacity: 0.9; 
`;


const contentStyles = css`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <div css={appStyles}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/musiclist"
            element={
              <>
                <Navbar />
                <div css={contentStyles}>
                  <SongList />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/myplaylist"
            element={
              <>
                <Navbar />
                <div css={contentStyles}>
                  <MyPlayList />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/addsong"
            element={
              <>
                <Navbar />
                <div css={contentStyles}>
                  <SongForm />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/editsong/:id"
            element={
              <>
                <Navbar />
                <div css={contentStyles}>
                  <EditSongs />
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
