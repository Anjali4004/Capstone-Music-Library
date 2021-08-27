import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import songApi from "../API/songApi";
import userApi from "../API/userApi";

export const loadSongsAsync = createAsyncThunk("songs/setsongs", async () => {
  const response = await songApi.getSongs();
  return response.data;
});
export const addSongAsync = createAsyncThunk(
  "songs/addsong",
  async (song, { rejectWithValue }) => {
    try {
      const response = await songApi.postData(song);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteSongAsync = createAsyncThunk(
  "songs/deletesong",
  async (itemId) => {
    console.log(itemId);
    const response = await songApi.handleDelete(itemId);
    console.log(response);
    return response;
  }
);
export const loadUserAsync = createAsyncThunk("user/validation", async () => {
  const response = await userApi.getUsers();
  return response.data;
});
export const addUserAsync = createAsyncThunk(
  "user/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await userApi.addUser(user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const songSlice = createSlice({
  name: "songs",
  initialState: [],
  reducers: {},
  extraReducers: {
    [loadSongsAsync.pending]: (state) => {
      console.log("loadSongsAsync pending...");
      return state;
    },
    [loadSongsAsync.fulfilled]: (state, action) => {
      console.log("loadSongsAsync success...");
      return action.payload;
    },
    [loadSongsAsync.rejected]: (state, action) => {
      console.log("loadSongsAsync error...");
    },
    [addSongAsync.pending]: (state) => {
      console.log("addSongAsync pending...");
      return state;
    },
    [addSongAsync.fulfilled]: (state, action) => {
      console.log("addSongAsync success...");
      state.push(action.payload);
    },
    [addSongAsync.rejected]: (state, action) => {
      console.log("addSongAsync error...");
      throw action.payload;
    },
    [deleteSongAsync.pending]: (state) => {
      console.log("loadSongsAsync pending...");
      return state;
    },
    [deleteSongAsync.fulfilled]: (state, action) => {
      console.log("loadSongsAsync success...");
      return action.payload;
    },
    [deleteSongAsync.rejected]: (state, action) => {
      console.log("loadSongsAsync error...");
    },
  },
});
export const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers: {
    [loadUserAsync.pending]: (state) => {
      console.log("loading...");
      return state;
    },
    [loadUserAsync.fulfilled]: (state, action) => {
      console.log("Users data fetched");
      return action.payload;
    },
    [loadUserAsync.rejected]: (state, action) => {
      console.log("error...");
    },
    [addUserAsync.pending]: (state) => {
      console.log("addUserAsync pending...");
      return state;
    },
    [addUserAsync.fulfilled]: (state, action) => {
      console.log("addUserAsync success...");
      state.push(action.payload);
    },
    [addUserAsync.rejected]: (state, action) => {
      console.log("addUserAsync error...");
      throw action.payload;
    },
  },
});
