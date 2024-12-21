import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = "http://localhost:3000/"; //'https://tracker-of-water-xk7t.onrender.com/';

export const getMonthWater = createAsyncThunk(
  '/month/getMonthWater',
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await axios.get(`/month?month=${month}&year=${year}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
