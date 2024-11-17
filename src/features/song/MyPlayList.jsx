/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongs,
  deleteSong,
  selectAllSongs,
  getSongStatus,
  getSongError,
} from "./songSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { space, layout, color, flexbox } from "styled-system";

const Container = styled("div")(space, layout, color, flexbox, {
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  "@media (min-width: 576px)": {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
const SongItem = styled("li")({
  display: "block",
  flexDirection: "column",
  margin: "6px",  
  height:"250px",
  padding: "1rem",
  width: "90%",
  border: "1px solid #ddd",
  borderRadius: "8px",
  "@media (min-width: 576px)": {
    flexDirection: "row",
    maxWidth: "44%",
  },
  "@media (min-width: 992px)": {
    maxWidth: "20%",
  },
});

const SongTitle = styled("h3")({
  fontSize: "18px",
  marginBottom: "0.5rem",
  color: "lightgray",
});

const SongArtist = styled("p")({
  fontSize: "16px",
  marginBottom: "0.5rem",
  color: "lightgray",
});

const MediaContainer = styled("div")({
  marginTop: "0.5rem",
  width: "100%",
  height: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
});
const Button = styled("button")(({ variant }) => ({
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  backgroundColor:
    variant === "delete"
      ? "#dc3545"
      : variant === "update"
      ? "transparent"
      : "#007BFF",
  color:
    variant === "delete" ? "#fff" : variant === "update" ? "#007BFF" : "#fff",
  border: variant === "update" ? "2px solid #007BFF" : "none",
  "&:hover": {
    backgroundColor:
      variant === "delete"
        ? "#c82333"
        : variant === "update"
        ? "transparent" // Adjusting hover background for update
        : "#0056b3",
  },
}));

const MyPlayList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const songs = useSelector(selectAllSongs);
  const songStatus = useSelector(getSongStatus);
  const songError = useSelector(getSongError);

  const [playingIndex, setPlayingIndex] = useState(null);
  const mediaRefs = useRef([]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (songStatus === "idle") {
      dispatch(fetchSongs());
    }
  }, [songStatus, dispatch]);

  const handleMediaClick = (index) => {
    if (playingIndex !== null && playingIndex !== index) {
      mediaRefs.current[playingIndex].pause();
    }
    setPlayingIndex(index);
  };

  const handleMediaDelete = (songId) => {
    dispatch(deleteSong({ songId }));
    navigate("/myplaylist");
  };

  const isVideo = (fileUrl) => {
    const videoExtensions = [".mp4", ".webm", ".ogg"];
    return videoExtensions.some((ext) => fileUrl.endsWith(ext));
  };

  let content;

  if (songStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (songStatus === "succeeded") {
    content = (
      <Container>
        {songs.map(
          (song, index) =>
            song.email === email && (
              <SongItem key={song._id || index}>
                <SongTitle>{song.title}</SongTitle>
                <SongArtist>Artist: {song.artist}</SongArtist>

                <MediaContainer>
                  {isVideo(song.avatar) ? (
                    <video
                      ref={(el) => (mediaRefs.current[index] = el)}
                      width="100%"
                      height="100%"
                      controls
                      onPlay={() => handleMediaClick(index)}
                    >
                      <source src={song.avatar} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <audio
                      ref={(el) => (mediaRefs.current[index] = el)}
                      controls
                      onPlay={() => handleMediaClick(index)}
                      style={{ width: "100%" }}
                    >
                      <source src={song.avatar} type="audio/mp3" />
                      Your browser does not support the audio tag.
                    </audio>
                  )}
                </MediaContainer>
                <ButtonContainer>
                  <Button
                    variant="delete"
                    onClick={() => handleMediaDelete(song._id)}
                  >
                    Remove
                  </Button>
                  <Link to={`/editsong/${song._id}`}>
                    <Button variant="update">Edit</Button>
                  </Link>
                </ButtonContainer>
              </SongItem>
            )
        )}
      </Container>
    );
  } else if (songStatus === "failed") {
    content = <p>Error: {songError}</p>;
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default MyPlayList;
