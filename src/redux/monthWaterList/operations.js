import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMonthWater = createAsyncThunk(
  '/month/getMonthWater',
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await axios.get(`/water/month/${month}?year=${year}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
