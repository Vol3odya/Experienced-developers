
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchUser, updateUser, updateUserAvatar } from './operations.js';


const handleFulfilled = (state, action) => {
  (state.isLoading = false),
    (state.error = null),
    (state.user = action.payload);
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          fetchUser.fulfilled,
          updateUserAvatar.fulfilled,
          updateUser.fulfilled
        ),
        handleFulfilled
      )
      .addMatcher(
        isAnyOf(
          fetchUser.pending,
          updateUserAvatar.pending,
          updateUser.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchUser.rejected,
          updateUserAvatar.rejected,
          updateUser.rejected
        ),
        handleRejected
      );
  },
});

export const userReducer = slice.reducer;
