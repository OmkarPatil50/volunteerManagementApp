import { configureStore } from "@reduxjs/toolkit";
import { volunteerSlice } from "./slices/volunteerSlice";
import { eventSlice } from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    volunteers: volunteerSlice.reducer,
    events: eventSlice.reducer
  }
});
