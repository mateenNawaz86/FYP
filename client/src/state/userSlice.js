import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Signin action
export const signin = createAsyncThunk("auth/signin", async (userData) => {
  const response = await fetch("http://localhost:5000/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    const data = await response.json();

    // Store the token in local storage or Redux state
    localStorage.setItem("token", data.authToken);
    localStorage.setItem("user", data.user.name); // Store the user's name
    return { token: data.token, user: data.user };
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    user: localStorage.getItem("user"),
    error: null,
  },
  reducers: {
    setLogout(state) {
      // Clear the token from local storage or Redux state
      localStorage.removeItem("token");
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      state.token = action.payload;
      state.error = null;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { setLogout } = authSlice.actions;

export default authSlice.reducer;
