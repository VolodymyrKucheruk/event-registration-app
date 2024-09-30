import { createSlice } from "@reduxjs/toolkit";
import {
  fetchParticipants,
  registerParticipant,
} from "../operations/participantsOperations";

const participantsSlice = createSlice({
  name: "participants",
  initialState: {
    participants: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload;
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerParticipant.fulfilled, (state, action) => {
        state.participants.push(action.payload);
      });
  },
});

export const participantsReducer = participantsSlice.reducer;
