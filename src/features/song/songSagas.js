import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchSongsSuccess,
  fetchSongsFailure,
  addNewSongSuccess,
  addNewSongFailure,
  deleteSongSuccess,
  deleteSongFailure,
  updateSongSuccess,
  updateSongFailure,
} from "./songSlice";

// const SONG_URL = "https://backendmusicplayer.vercel.app/music";
const SONG_URL = "http://localhost:9999/music";



function* fetchSongsSaga() {
  try {
    const response = yield call(axios.get, SONG_URL);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  } 
}

function* addNewSongSaga(action) {
  const { title, artist,email, video } = action.payload;
  try {
    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("email", email);
    formData.append("artist", artist);

    const response = yield call(axios.post, SONG_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    yield put(addNewSongSuccess(response.data));
  } catch (error) {
    yield put(addNewSongFailure(error.message));
  }
}

function* deleteSongSaga(action) {
  try {
    const { songId } = action.payload;
    yield call(axios.delete, `${SONG_URL}/${songId}`);
    yield put(deleteSongSuccess(songId));
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

function* updateSongSaga(action) {
  const { songId, title, artist,email, video } = action.payload;
  try {
    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("email", email);
    formData.append("artist", artist);

    const response = yield call(axios.put, `${SONG_URL}/${songId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(updateSongFailure(error.message));
  }
}

export function* watchSongSagas() {
  yield takeLatest("songs/fetchSongs", fetchSongsSaga);
  yield takeLatest("songs/addNewSong", addNewSongSaga);
  yield takeLatest("songs/deleteSong", deleteSongSaga);
  yield takeLatest("songs/updateSong", updateSongSaga);
}
