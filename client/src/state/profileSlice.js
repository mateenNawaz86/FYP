import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Signin action
export const sellerSignIn = createAsyncThunk(
  "profile/sellerSignIn",
  async (userData) => {
    const response = await fetch("http://localhost:5000/api/seller-signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // IF API send back a correct response
    if (response.ok) {
      const data = await response.json();

      // Store the token in local storage or Redux state
      localStorage.setItem("token", data.authToken);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("user", data.user.name); // Store the user's name
      return { token: data.token, user: data.user };
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }
);

// Async thunk action to fetch profile by ID
export const fetchProfileById = createAsyncThunk(
  "profile/fetchProfileById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/profile-detail/${id}`
      );
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Profile slice
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
    user: localStorage.getItem("user"),
    profile: null,
    loading: false,
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
    builder.addCase(sellerSignIn.fulfilled, (state, action) => {
      state.token = action.payload;
      state.error = null;
    });
    builder.addCase(sellerSignIn.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // Handle the pending state while fetching the profile
    builder.addCase(fetchProfileById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // Handle the fulfilled state when profile is successfully fetched
    builder.addCase(fetchProfileById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.profile = action.payload; // Update the profile state with the fetched data
    });

    // Handle the rejected state when there is an error fetching the profile
    builder.addCase(fetchProfileById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Update the error state with the error payload
      state.profile = null; // Reset the profile state
    });
  },
});

export const { setLogout } = profileSlice.actions;

export default profileSlice.reducer;
