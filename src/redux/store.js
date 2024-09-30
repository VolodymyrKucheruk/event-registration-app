import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/eventsSlice";
import { participantsReducer } from "./slices/participantsSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    participants: participantsReducer,
  },
});
