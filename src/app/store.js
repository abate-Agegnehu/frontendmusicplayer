import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songReducer from "../features/song/songSlice";
import userReducer from "../features/user/userSlice";
import { watchSongSagas } from "../features/song/songSagas";
import { watchUserSagas } from "../features/user/userSagas"; 

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs: songReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchSongSagas);
sagaMiddleware.run(watchUserSagas); 
