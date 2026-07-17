import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlice";
import sessionSlicer from "./sessionSlice";

export const store = configureStore({
  reducer: {
    auth: authSlicer,
    session: sessionSlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
