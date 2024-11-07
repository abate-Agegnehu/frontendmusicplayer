import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  status: "idle",
  error: null,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongs: (state) => {
      state.status = "loading";
    },
    fetchSongsSuccess: (state, action) => {
      state.status = "succeeded";
      state.songs = action.payload;
    },
    fetchSongsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addNewSong: (state) => {
      state.status = "loading";
    },
    addNewSongSuccess: (state, action) => {
      state.songs.push(action.payload);
      state.status = "succeeded";
    },
    addNewSongFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    deleteSong: (state) => {
      state.status = "loading";
    },
    deleteSongSuccess: (state, action) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
      state.status = "succeeded";
    },
    deleteSongFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    updateSong: (state) => {
      state.status = "loading";
    },
    updateSongSuccess: (state, action) => {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.status = "succeeded";
    },
    updateSongFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    fetchSongsByEmail: (state) => {
      state.status = "loading";
    },
    fetchSongsByEmailSuccess: (state, action) => {
      state.status = "succeeded";
      state.songs = action.payload;
    },
    fetchSongsByEmailFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  addNewSong,
  addNewSongSuccess,
  addNewSongFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
  fetchSongsByEmail,
  fetchSongsByEmailSuccess,
  fetchSongsByEmailFailure,
} = songSlice.actions;

export const selectAllSongs = (state) => state.songs.songs;
export const getSongStatus = (state) => state.songs.status;
export const getSongError = (state) => state.songs.error;
export default songSlice.reducer;
