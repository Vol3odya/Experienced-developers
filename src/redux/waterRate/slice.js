import { createSlice } from '@reduxjs/toolkit';
import { putWaterRate } from './operations.js';

const initialState = {
  isLoading: false,
  isError: false,
  data: null,
};

const waterRateSlice = createSlice({
  name: 'waterRate',
  initialState,
  extraReducers: (builder) => {
    builder
      // .addCase(fetchWaterRate.fulfilled, (state, action) => {
      //         state.data = action.payload;
      //         state.isError = null;
      //         state.isLoading = false;
      //       })
      .addCase(putWaterRate.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isError = null;
        state.isLoading = false;
      })
      // .addCase(fetchWaterRate.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(putWaterRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(putWaterRate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default waterRateSlice.reducer;
