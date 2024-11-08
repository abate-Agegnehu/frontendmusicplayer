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

// Styled components using Emotion
const PlaylistContainer = styled.div`
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const SongList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SongItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const SongTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
`;

const SongArtist = styled.p`
  font-size: 1rem;
  color: #555;
`;

const VideoPlayer = styled.video`
  width: 320px;
  height: 240px;
  margin-bottom: 1rem;
  border-radius: 8px;
`;

const Button = styled.button`
  background-color: #ff4757;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e04040;
  }
`;

const UpdateLink = styled(Link)`
  color: #1e90ff;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MyPlayList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const songs = useSelector(selectAllSongs);
  const songStatus = useSelector(getSongStatus);
  const songError = useSelector(getSongError);

  const [playingIndex, setPlayingIndex] = useState(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      console.log(email);
    }
    if (songStatus === "idle") {
      dispatch(fetchSongs());
    }
  }, [songStatus, dispatch, email]);

  const handleVideoClick = (index) => {
    if (playingIndex !== null && playingIndex !== index) {
      videoRefs.current[playingIndex].pause();
    }
    setPlayingIndex(index);
  };

  const handleVideoDelete = (songId) => {
    console.log(songId);
    dispatch(deleteSong({ songId }));
    navigate("/myplaylist");
  };

  let content;

  if (songStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (songStatus === "succeeded") {
    content = (
      <SongList>
        {songs.map(
          (song, index) =>
            song.email === email && (
              <SongItem key={song._id || index}>
                <SongTitle>{song.title}</SongTitle>
                <SongArtist>Artist: {song.artist}</SongArtist>
                <VideoPlayer
                  ref={(el) => (videoRefs.current[index] = el)}
                  controls
                  onPlay={() => handleVideoClick(index)}
                >
                  <source src={song.avatar} type="video/mp4" />
                  Your browser does not support the video tag.
                </VideoPlayer>
                <Button onClick={() => handleVideoDelete(song._id)}>
                  Delete
                </Button>
                <UpdateLink to={`/editsong/${song._id}`}>Update</UpdateLink>
              </SongItem>
            )
        )}
      </SongList>
    );
  } else if (songStatus === "failed") {
    content = <p>Error: {songError}</p>;
  }

  return (
    <PlaylistContainer>
      <Title>My Playlist</Title>
      {content}
    </PlaylistContainer>
  );
};

export default MyPlayList;
