import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  sessionId: string;
};

const initialState: AuthState = {
  sessionId: "",
};

const authSlicer = createSlice({
  name: "session",
  initialState,
  reducers: {
    setCurrentSession: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
  },
});

export const { setCurrentSession } = authSlicer.actions;

export default authSlicer.reducer;
