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
      <ul>
        {songs.map(
          (song, index) =>
            song.email === email && (
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
                <button onClick={() => handleVideoDelete(song._id)}>
                  Delete
                </button>
                <Link to={`/editsong/${song._id}`}>Update</Link>
              </li>
            )
        )}
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

export default MyPlayList;
