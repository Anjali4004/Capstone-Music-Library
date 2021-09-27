import { configureStore } from "@reduxjs/toolkit";
import { songSlice, userSlice } from "./songReducer";
import { playlistSlice } from "./playlistReducer";

const store = configureStore({
  reducer: {
    songs: songSlice.reducer,
    users: userSlice.reducer,
    playlist: playlistSlice.reducer,
  },
});

export default store;
