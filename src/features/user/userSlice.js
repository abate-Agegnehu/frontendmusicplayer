import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
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
      state.error = null; 
    },
    loginUserSuccess: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null; 
    },
    loginUserFailure: (state, action) => {
      state.user = null;
      state.status = "failed";
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null; 
      state.status = "idle"; 
      state.error = null; 
    },
  },
});

export const {
  addNewUser,
  addNewUserSuccess,
  addNewUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
} = userSlice.actions;

export const getUserStatus = (state) => state.users.status;
export const getUserError = (state) => state.users.error;
export const getLoggedInUser = (state) => state.users.user;

export default userSlice.reducer;
