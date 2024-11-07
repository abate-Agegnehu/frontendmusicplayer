import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import bcrypt from "bcryptjs";
import {
  addNewUserSuccess,
  addNewUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
} from "./userSlice";

const USER_URL = "http://localhost:8888/user";

function* addNewUserSaga(action) {
  const { username, email, password } = action.payload;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const response = yield call(axios.post, `${USER_URL}/register`, {
      username,
      email,
      password: hashedPassword,
    });

    yield put(addNewUserSuccess(response.data));
  } catch (error) {
    yield put(addNewUserFailure(error.message));
  }
}
function* loginUserSaga(action) {
  const { email, password } = action.payload;
  try {
    const response = yield call(axios.post, `${USER_URL}/login`, { email, password });

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
