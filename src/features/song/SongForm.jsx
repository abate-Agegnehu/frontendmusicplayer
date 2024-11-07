import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewSong } from "./songSlice";
import { useNavigate } from "react-router-dom";

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
      console.log(email)
    }
  }, []);

  const canSave =
    [title, artist, video].every(Boolean) && addRequestStatus === "idle";

  const onSaveSongClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");

        await dispatch(addNewSong({ title, artist,email, video })).unwrap();
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
    <div>
      <h2>Add a New Song</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={title}
        onChange={onTitleChanged}
        placeholder="Song Title"
        required
      />
      <input
        type="text"
        value={artist}
        onChange={onArtistChanged}
        placeholder="Artist"
        required
      />
      <input
        type="file"
        accept="video/*" // Accept video files only
        onChange={onVideoChanged}
        required
      />
      <button type="button" onClick={onSaveSongClicked} disabled={!canSave}>
        Add Song
      </button>
    </div>
  );
};

export default SongForm;
