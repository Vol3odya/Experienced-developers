import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const getWaterFromToday = createAsyncThunk(
  'today/getWater',
  async (_, thunkAPI) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await axios.get(`/water/day/${today}`);
      return {...response.data.data, date: today};
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
