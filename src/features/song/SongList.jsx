/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongs,
  selectAllSongs,
  getSongStatus,
  getSongError,
} from "./songSlice";
import styled from "@emotion/styled";

// Styled components using Emotion
const SongListContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
`;

const SongItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const SongTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
`;

const ArtistName = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 1rem;
`;

const VideoPlayer = styled.video`
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  max-width: 100%;
  margin-top: 1rem;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #007bff;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2rem;
  text-align: center;
`;

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector(selectAllSongs);
  const songStatus = useSelector(getSongStatus);
  const songError = useSelector(getSongError);

  const [playingIndex, setPlayingIndex] = useState(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (songStatus === "idle") {
      dispatch(fetchSongs());
    }
  }, [songStatus, dispatch]);

  const handleVideoClick = (index) => {
    if (playingIndex !== null && playingIndex !== index) {
      videoRefs.current[playingIndex].pause();
    }
    setPlayingIndex(index);
  };

  let content;

  if (songStatus === "loading") {
    content = <LoadingMessage>Loading...</LoadingMessage>;
  } else if (songStatus === "succeeded") {
    content = (
      <ul>
        {songs.map((song, index) => (
          <SongItem key={song._id || index}>
            <SongTitle>{song.title}</SongTitle>
            <ArtistName>Artist: {song.artist}</ArtistName>
            <VideoPlayer
              ref={(el) => (videoRefs.current[index] = el)}
              controls
              onPlay={() => handleVideoClick(index)}
            >
              <source src={song.avatar} type="video/mp4" />
              Your browser does not support the video tag.
            </VideoPlayer>
          </SongItem>
        ))}
      </ul>
    );
  } else if (songStatus === "failed") {
    content = <ErrorMessage>Error: {songError}</ErrorMessage>;
  }

  return (
    <SongListContainer>
      <Title>Song List</Title>
      {content}
    </SongListContainer>
  );
};

export default SongList;
