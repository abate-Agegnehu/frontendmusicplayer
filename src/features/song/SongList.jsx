/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { space, layout, color, flexbox } from "styled-system";
import {
  fetchSongs,
  selectAllSongs,
  getSongStatus,
  getSongError,
} from "./songSlice";

const Container = styled("div")(space, layout, color, flexbox, {
  padding: "1rem",
  margin: "0 auto",
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
  margin: "8px",
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
  color: "#4b5d46",
});

const SongArtist = styled("p")({
  fontSize: "14px",
  marginBottom: "0.5rem",
  color: "#666",
});

const MediaContainer = styled("div")({
  marginTop: "0.5rem",
  width: "100%",
  height: "70%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector(selectAllSongs);
  const songStatus = useSelector(getSongStatus);
  const songError = useSelector(getSongError);

  const [playingIndex, setPlayingIndex] = useState(null);
  const mediaRefs = useRef([]);

  useEffect(() => {
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
        {songs.map((song, index) => (
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
          </SongItem>
        ))}
      </Container>
    );
  } else if (songStatus === "failed") {
    content = <p>Error: {songError}</p>;
  }

  return (
    < >
      {content}
    </>
  );
};

export default SongList;
