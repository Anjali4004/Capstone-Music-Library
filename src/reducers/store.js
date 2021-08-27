import { configureStore } from "@reduxjs/toolkit";
import { songSlice, userSlice } from "./songReducer";

const store = configureStore({
  reducer: {
    songs: songSlice.reducer,
    users: userSlice.reducer,
  },
});

export default store;
