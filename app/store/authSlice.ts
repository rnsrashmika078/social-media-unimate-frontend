import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUserType } from "../types/globalTypes";

type AuthState = {
  authUser: AuthUserType | null;
};

const initialState: AuthState = {
  authUser: null,
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUserType | null>) => {
      state.authUser = action.payload;
    },
  },
});

export const { setAuthUser } = authSlicer.actions;

export default authSlicer.reducer;
