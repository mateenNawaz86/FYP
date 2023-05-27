import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk action to fetch profile by ID
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/order-detail/${id}`
      );
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Profile slice
const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending state while fetching the profile
    builder.addCase(fetchOrderById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // Handle the fulfilled state when profile is successfully fetched
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.order = action.payload;
    });

    // Handle the rejected state when there is an error fetching the profile
    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.order = null;
    });
  },
});

export default bookingSlice.reducer;
