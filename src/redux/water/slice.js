import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addWater, deleteWater, updateWater } from './operations.js';

const initialState = {
    waterShots: [],
    isLoading: false,
    error: null,
}


const handlePending = (state) => {
    state.isLoading = true;
}

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const WaterSlice = createSlice({
    name: "water",
    initialState,
    extraReducers : (builder) => {
        builder
        .addCase(addWater.fulfilled, (state, action) => {
            state.isLoading = false,
            state.error = null,
            state.waterShots.push(action.payload)
        })
        .addCase(updateWater.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            const index = state.waterShots.findIndex(
                (water) => water._id === action.payload._id
              );
              //якщо index - false
              if (index !== -1) {
                state.waterShots[index] = action.payload;
              }
        })
        .addCase(deleteWater.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            const index = state.waterShots.findIndex(
                (water) => water.userId === action.payload.userId
              );
              //якщо index - false
              if (index !== -1) {
                state.waterShots[index].splice(index, 1)
              }
        })
        .addMatcher(isAnyOf(addWater.pending, updateWater.pending, deleteWater.pending), handlePending)
        .addMatcher(isAnyOf(addWater.rejected, updateWater.rejected, deleteWater.rejected), handleRejected)
    },
},
);

export default WaterSlice.reducer;