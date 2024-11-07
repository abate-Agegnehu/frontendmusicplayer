import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  status: "idle",
  error: null,
  isAuthenticated: false,
  mode: "login",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsers: (state) => {
      state.status = "loading";
    },
    fetchUsersSuccess: (state, action) => {
      state.status = "succeeded";
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addNewUser: (state) => {
      state.status = "loading";
    },
    addNewUserSuccess: (state, action) => {
      state.users.push(action.payload);
      state.status = "succeeded";
    },
    addNewUserFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    loginUser: (state) => {
      state.status = "loading";
    },
    loginUserSuccess: (state) => {
      state.isAuthenticated = true;
      state.status = "succeeded";
    },
    loginUserFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    toggleMode: (state) => {
      state.mode = state.mode === "login" ? "signup" : "login";
    },
  },
});

export const {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  addNewUser,
  addNewUserSuccess,
  addNewUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logout,
  toggleMode,
} = userSlice.actions;

export const selectAllUsers = (state) => state.users.users;
export const getUserStatus = (state) => state.users.status;
export const getUserError = (state) => state.users.error;
export const getIsAuthenticated = (state) => state.users.isAuthenticated;
export const selectMode = (state) => state.users.mode;

export default userSlice.reducer;
