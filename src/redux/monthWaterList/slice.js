import { createSlice, createSelector } from '@reduxjs/toolkit';
import { logout } from '../auth/operations';

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
  name: 'monthWaterList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMonthWater.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getMonthWater.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getMonthWater.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.items = action.payload;
        state.date = action.payload.date;
        state.daylyNorma = action.payload.daylyNorma;
        state.servings = action.payload.servings;
        state.percentFromDailyNorma = action.payload.percentFromDailyNorma;
      });
  },
});

export default slice.reducer;
