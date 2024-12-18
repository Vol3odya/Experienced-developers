  import { createSlice } from '@reduxjs/toolkit';
import { getWaterFromToday } from './operations.js';

const initialState = {
  items: [
    {
      date: null,
      amount: null,
      percentFromNorm: null,
    },
  ],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'todayWaterList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWaterFromToday.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getWaterFromToday.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getWaterFromToday.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const todayReducer = slice.reducer;
