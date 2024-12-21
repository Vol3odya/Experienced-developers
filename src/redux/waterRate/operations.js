import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

//axios.defaults.baseURL = 'https://tracker-of-water-xk7t.onrender.com/'; //'https://tracker-of-water-xk7t.onrender.com/';

// export const fetchWaterRate = createAsyncThunk(
//   'waterRate/fetchWaterRate',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get('/waterRate');
//       return response.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const putWaterRate = createAsyncThunk(
  'waterRate/putWaterRate',
  async (dailyNorma, thunkAPI) => {
    try {
      const response = await axios.patch('/waterRate', dailyNorma);
      return response.data.dailyNorma;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
