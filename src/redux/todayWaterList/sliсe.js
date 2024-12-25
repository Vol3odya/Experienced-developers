  import { createSlice } from '@reduxjs/toolkit';
import { getWaterFromToday } from './operations.js';

const initialState = {
  items: [],
  totalWaterVolume: 0,
  waterVolumeInPercent: 0,
  loading: false,
  error: null,
};


const slice = createSlice({
  name: 'today',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWaterFromToday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWaterFromToday.fulfilled, (state, action) => {
        state.items = action.payload.waterVolumeTimeEntries;
        state.waterVolumeInPercent = action.payload.waterVolumeInPercent,
        state.totalWaterVolume=action.payload.totalWaterVolume,
        state.date = action.payload.date;
        state.loading = false;
        state.error = null;
      })
      .addCase(getWaterFromToday.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default slice.reducer;
