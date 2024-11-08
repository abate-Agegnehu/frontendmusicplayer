/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateSong, selectAllSongs } from "./songSlice";
import styled from "@emotion/styled";

// Styled components using Emotion
const EditSongContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  color: #333;
  background-color: #fff;

  &:focus {
    border-color: #ff4757;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #ff4757;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e04040;
  }
`;

const EditSongs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const songs = useSelector(selectAllSongs);
  const song = songs.find((song) => song._id === id);

  const [title, setTitle] = useState(song?.title || "");
  const [artist, setArtist] = useState(song?.artist || "");
  const [email, setEmail] = useState(song?.email || "");

  useEffect(() => {
    if (song) {
      setTitle(song.title);
      setArtist(song.artist);
      setEmail(song.email);
    }
  }, [song]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (song) {
      dispatch(
        updateSong({
          songId: song._id,
          title,
          artist,
          email,
          video: song.avatar,
        })
      );
      navigate("/myplaylist");
    }
  };

  if (!song) {
    return <p>Loading song details...</p>;
  }

  return (
    <EditSongContainer>
      <Title>Edit Song</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Title:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label>Artist:</Label>
          <Input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <div>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <SubmitButton type="submit">Update</SubmitButton>
      </Form>
    </EditSongContainer>
  );
};

export default EditSongs;
