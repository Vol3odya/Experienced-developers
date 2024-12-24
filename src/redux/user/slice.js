
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchUser, updateUser, updateUserAvatar } from './operations.js';


const handleFulfilled = (state, action) => {
  if (action.type === "user/updateUserAvatar/fulfilled") {
    state.user.photo = action.payload; // Обновляем только аватар
  } else if (action.payload.user) {
    state.user = { ...state.user, ...action.payload.user }; // Обновляем, если данные лежат в user
  } else {
    state.user = { ...state.user, ...action.payload }; // Если данные приходят напрямую
  }
  state.isLoading = false;
  state.error = null;
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

export default slice.reducer;
