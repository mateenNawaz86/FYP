import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending state while fetching the profile
    builder.addCase(fetchProfileById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // Handle the fulfilled state when profile is successfully fetched
    builder.addCase(fetchProfileById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.profile = action.payload;
    });

    // Handle the rejected state when there is an error fetching the profile
    builder.addCase(fetchProfileById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.profile = null;
    });
  },
});

export default profileSlice.reducer;
