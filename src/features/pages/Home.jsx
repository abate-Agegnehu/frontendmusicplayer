/** @jsxImportSource @emotion/react */
import React from "react";
import Navbar from "./Navbar";
import SongList from "../song/SongList";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
`;

const Home = () => {
  return (
    <Container>
      <Navbar />
      <SongList />
    </Container>
  );
};

export default Home;
