import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authToken: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user; // set entered user detial to user state
      state.authToken = action.payload.authToken; // Set entered user token to token state
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.authToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions; // export methods as function
export default authSlice.reducer; // export reducer functions
