import { createSlice } from '@reduxjs/toolkit';

import { getMonthWater } from './operations.js';

const initialState = {
  items: [
    {
      date: null,
      daylyNorma: null,
      servings: null,
      percentFromDailyNorma: null,
    },
  ],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'month',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMonthWater.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMonthWater.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getMonthWater.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default slice.reducer;
