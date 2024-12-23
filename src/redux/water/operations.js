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
  async ({ waterVolume, date, _id }, thunkAPI) => {
    try {
      console.log(_id);
      const response = await axios.patch(`/water/${_id}`, { date, waterVolume });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async ({ _id }, thunkAPI) => {
    try {
      await axios.delete(`/water/${_id}`);
      return _id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
