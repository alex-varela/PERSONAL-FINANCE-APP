import { configureStore } from "@reduxjs/toolkit";
import monthsReducer from "./slices/monthsSlice";

const store = configureStore({
  reducer: {
    months: monthsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
