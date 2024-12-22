import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//axios.defaults.baseURL = "http://localhost:3000/"; //'https://tracker-of-water-xk7t.onrender.com/';

export const addWater = createAsyncThunk(
  "water/addWater",
  async ({ waterVolume, date }, thunkAPI) => {
    try {
      const response = await axios.post("/water", { date, waterVolume });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  "water/updateWater",
  async ({ waterVolume, date, userId }, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/${userId}`, { date, waterVolume });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async ({ userId }, thunkAPI) => {
    try {
      await axios.delete(`/water/${userId}`);
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
