import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  addNewUserSuccess,
  addNewUserFailure,
  loginUserSuccess,
  loginUserFailure,
} from "./userSlice";
const USER_URL = "https://backendmusicplayer-production.up.railway.app/music";

function* addNewUserSaga(action) {
  const { username, email, password } = action.payload;
  try {
    const response = yield call(axios.post, `${USER_URL}/register`, {
      username,
      email,
      password,
    });

    yield put(addNewUserSuccess(response.data));
  } catch (error) {
    yield put(addNewUserFailure(error.message));
  }
}

function* loginUserSaga(action) {
  const { email, password } = action.payload;
  try {
    const response = yield call(axios.post, `${USER_URL}/login`, {
      email,
      password,
    });

    if (response.data.isAuthenticated) {
      yield put(loginUserSuccess());
    } else {
      yield put(loginUserFailure("Invalid email or password"));
    }
  } catch (error) {
    yield put(loginUserFailure(error.message));
  }
}

export function* watchUserSagas() {
  yield takeLatest("users/addNewUser", addNewUserSaga);
  yield takeLatest("users/loginUser", loginUserSaga);
}
