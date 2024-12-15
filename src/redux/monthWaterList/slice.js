import { createSlice } from '@reduxjs/toolkit';

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
      })
      .addCase(getMonthWater.fulfilled, (state, action) => {
        state.items = action.payload;
        state.date = action.payload.items.date;
        state.daylyNorma = action.payload.items.daylyNorma;
        state.servings = action.payload.items.servings;
        state.percentFromDailyNorma = action.payload.items.percentFromDailyNorma;
        state.loading = false;
      })
      .addCase(getMonthWater.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      
      });
  },
});

export const monthReducer = slice.reducer;
