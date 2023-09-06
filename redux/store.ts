import {configureStore} from "@reduxjs/toolkit";
import AppReducer from "./features/AppSlice";

export const store = configureStore({
  reducer: {
    AppReducer,
  },
  //   devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
