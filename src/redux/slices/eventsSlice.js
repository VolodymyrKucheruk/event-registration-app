import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents } from "../operations/eventsOperations";

const initialState = {
  items: [],
  loading: false,
  error: null,
  hasMore: true,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    resetEvents(state) {
      state.items = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.items = [...state.items, ...action.payload];
        }
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
