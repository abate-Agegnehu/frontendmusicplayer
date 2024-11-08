/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewSong } from "./songSlice";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

// Styled components using Emotion
const FormContainer = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #ccc;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const SongForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [email, setEmail] = useState("");
  const [video, setVideo] = useState(null);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onArtistChanged = (e) => setArtist(e.target.value);
  const onVideoChanged = (e) => setVideo(e.target.files[0]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const canSave =
    [title, artist, video].every(Boolean) && addRequestStatus === "idle";

  const onSaveSongClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");

        await dispatch(addNewSong({ title, artist, email, video })).unwrap();
        setTitle("");
        setArtist("");
        setVideo(null);
        setError(null);
      } catch (error) {
        console.error("Failed to save song", error);
        setError("Failed to save song. Please try again.");
      } finally {
        setAddRequestStatus("idle");
        navigate("/musiclist");
      }
    }
  };

  return (
    <FormContainer>
      <Title>Add a New Song</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputField
        type="text"
        value={title}
        onChange={onTitleChanged}
        placeholder="Song Title"
        required
      />
      <InputField
        type="text"
        value={artist}
        onChange={onArtistChanged}
        placeholder="Artist"
        required
      />
      <InputField
        type="file"
        accept="video/*"
        onChange={onVideoChanged}
        required
      />
      <Button type="button" onClick={onSaveSongClicked} disabled={!canSave}>
        Add Song
      </Button>
    </FormContainer>
  );
};

export default SongForm;
