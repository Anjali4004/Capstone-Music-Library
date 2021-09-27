import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import playlistApi from "../API/playlistApi";

export const loadPlaylistAsync = createAsyncThunk(
  "songs/loadPlaylist",
  async () => {
    const response = await playlistApi.getPlaylist();
    return response.data;
  }
);
export const addPlaylistAsync = createAsyncThunk(
  "songs/addPlaylist",
  async (playlist, { rejectWithValue }) => {
    try {
      const response = await playlistApi.postData(playlist);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const UpdatePlaylistAsync = createAsyncThunk(
  "songs/EditPlaylist",
  async (playlist, { rejectWithValue }) => {
    try {
      const response = await playlistApi.putData(playlist, playlist.id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deletePlaylistAsync = createAsyncThunk(
  "songs/deleteplaylist",
  async (itemId) => {
    const response = await playlistApi.handleDelete(itemId);

    return response;
  }
);

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: [],
  reducers: {},
  extraReducers: {
    [loadPlaylistAsync.pending]: (state) => {
      console.log("loadPlaylistAsync pending...");
      return state;
    },
    [loadPlaylistAsync.fulfilled]: (state, action) => {
      console.log("loadPlaylistAsync success...");
      return action.payload;
    },
    [loadPlaylistAsync.rejected]: (state, action) => {
      console.log("loadPlaylistAsync error...");
    },
    [addPlaylistAsync.pending]: (state) => {
      console.log("addPlaylistAsync pending...");
      return state;
    },
    [addPlaylistAsync.fulfilled]: (state, action) => {
      console.log("addPlaylistAsync success...");
      state.push(action.payload);
    },
    [addPlaylistAsync.rejected]: (state, action) => {
      console.log("addPlaylistAsync error...");
      throw action.payload;
    },
    [UpdatePlaylistAsync.pending]: (state) => {
      console.log("UpdatePlaylistAsync pending...");
      return state;
    },
    [UpdatePlaylistAsync.fulfilled]: (state, action) => {
      console.log("UpdatePlaylistAsync success...");
      state.push(action.payload);
    },
    [UpdatePlaylistAsync.rejected]: (state, action) => {
      console.log("UpdatePlaylistAsync error...");
      throw action.payload;
    },
    [deletePlaylistAsync.pending]: (state) => {
      console.log("deletePlaylistAsync pending...");
      return state;
    },
    [deletePlaylistAsync.fulfilled]: (state, action) => {
      console.log("deletePlaylistAsync success...");
      return action.payload;
    },
    [deletePlaylistAsync.rejected]: (state, action) => {
      console.log("deletePlaylistAsync error...");
    },
  },
});
