import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUserType } from "../types/globalTypes";

type AuthState = {
  value: number;
  authUser: AuthUserType | null;
};

const initialState: AuthState = {
  value: 0,
  authUser: null,
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },

    // decrement: (state) => {
    //   state.value -= 1;
    // },

    setAuthUser: (state, action: PayloadAction<AuthUserType | null>) => {
      state.authUser = action.payload;
    },
  },
});

export const { setAuthUser } = authSlicer.actions;

export default authSlicer.reducer;
