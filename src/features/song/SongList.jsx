import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongs,
  selectAllSongs,
  getSongStatus,
  getSongError,
} from "./songSlice";

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
    content = <p>Loading...</p>;
  } else if (songStatus === "succeeded") {
    content = (
      <ul>
        {songs.map((song, index) => (
          <li key={song._id || index}>
            <h3>{song.title}</h3>
            <p>Artist: {song.artist}</p>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              width="320"
              height="240"
              controls
              onPlay={() => handleVideoClick(index)}
            >
              <source src={song.avatar} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </li>
        ))}
      </ul>
    );
  } else if (songStatus === "failed") {
    content = <p>Error: {songError}</p>;
  }

  return (
    <div>
      <h2>Song List</h2>
      {content}
    </div>
  );
};

export default SongList;
