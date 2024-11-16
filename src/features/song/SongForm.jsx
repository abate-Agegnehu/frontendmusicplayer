/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewSong } from "./songSlice";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90%",
  width: "100%",
});

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  border: "1px solid #ddd",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  background:
    "linear-gradient(135deg, rgba(192, 160, 128, 0.6), rgba(224, 213, 195, 0.9))",
  padding: "1rem",
});

const Input = styled("input")({
  marginBottom: "1rem",
  padding: "1rem",
  fontSize: "1rem",
  outline:"none",
  width: "80%",
  border: "1px solid #ccc",
  borderRadius: "4px",
  "&:focus": {
    borderColor: "#007BFF",
  },
});

const Button = styled("button")({
  padding: "0.7rem 1.5rem",
  fontSize: "1rem",
  cursor: "pointer",
  backgroundColor: "#78B3CE",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  "&:disabled": {
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
  },
  "&:hover": {
    backgroundColor: "#E8BCB9",
  },
});

const ErrorMessage = styled("p")({
  color: "red",
  fontSize: "1rem",
  marginBottom: "1rem",
});

const SongForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [email, setEmail] = useState("");
  const [video, setVideo] = useState(null);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onArtistChanged = (e) => setArtist(e.target.value);
  const onVideoChanged = (e) => setVideo(e.target.files[0]);

  const canSave =
    [title, artist, video].every(Boolean) && addRequestStatus === "idle";

  const onSaveSongClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");

        await dispatch(addNewSong({ title, artist, email, video }));

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
    <Container>
      <FormContainer>
        <h2>Add a New Song</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          value={title}
          onChange={onTitleChanged}
          placeholder="Song Title"
          required
        />
        <Input
          type="text"
          value={artist}
          onChange={onArtistChanged}
          placeholder="Artist"
          required
        />
        <Input
          type="file"
          accept="video/*,audio/*"
          onChange={onVideoChanged}
          required
        />
        <Button type="button" onClick={onSaveSongClicked} disabled={!canSave}>
          Add Song
        </Button>
      </FormContainer>
    </Container>
  );
};

export default SongForm;
