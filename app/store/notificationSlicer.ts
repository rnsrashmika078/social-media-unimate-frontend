import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "../types/globalTypes";

type NotifyState = {
  notification: NotificationType[];
};

const initialState: NotifyState = {
  notification: [],
};

const notificationSlicer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationType[]>) => {
      state.notification = action.payload;
    },
  },
});

export const { setNotification } = notificationSlicer.actions;

export default notificationSlicer.reducer;
