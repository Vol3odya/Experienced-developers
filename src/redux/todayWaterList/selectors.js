export const selectLoading = (state) => state.todayWaterList.loading;
export const selectError = (state) => state.todayWaterList.error;

export const selectAmountToday = (state) => state.todayWaterList.amount;

export const selectPercentFromNorm = (state) =>
  state.todayWaterList.percentFromNorm;
