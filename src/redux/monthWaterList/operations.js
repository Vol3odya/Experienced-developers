import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = ...

export const getMonthWater = createAsyncThunk(
  '/month/getWater',
  async ({ month, year }, { thunkAPI }) => {
    try {
      const response = await axios.get(`/month?month=${month}&year=${year}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
