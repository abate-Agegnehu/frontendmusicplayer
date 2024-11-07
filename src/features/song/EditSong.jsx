import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateSong, selectAllSongs } from "./songSlice";

const EditSongs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the song ID from the URL
  const songs = useSelector(selectAllSongs); // Get all songs from the Redux store
  const song = songs.find((song) => song._id === id); // Find the specific song by ID

  const [title, setTitle] = useState(song?.title || "");
  const [artist, setArtist] = useState(song?.artist || "");

  useEffect(() => {
    if (song) {
      setTitle(song.title);
      setArtist(song.artist);
    }
  }, [song]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (song) {
      dispatch(
        updateSong({ songId: song._id, title, artist, video: song.avatar })
      );
      navigate("/");
    }
  };

  if (!song) {
    return <p>Loading song details...</p>;
  }

  return (
    <div className="edit-song">
      <h3>Edit Song</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Artist:
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditSongs;
