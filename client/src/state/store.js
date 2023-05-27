import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";
import bookingReducer from "./bookingSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
    profile: profileReducer,
    booking: bookingReducer,
  },
});

export default store;
