import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
    profile: profileReducer,
  },
});

export default store;
