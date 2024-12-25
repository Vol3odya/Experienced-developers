export const selectLoading = (state) => state.monthWaterList.loading;
export const selectError = (state) => state.monthWaterList.error;

export const selectItems = (state) => state.month.items.data;

export const selectDate = (state) => state.monthWaterList.date;

export const selectDaylyNorma = (state) => state.monthWaterList.daylyNorma;

export const selectServings = (state) => state.monthWaterList.servings;

export const selectPercentFromDailyNorma = (state) =>
  state.monthWaterList.percentFromDailyNorma;
