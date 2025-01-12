import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  username: string;
  userId: string;
  isHost: boolean;
  activeSession: SessionData | null;
}

const initialState: UserState = {
  username: "",
  userId: "",
  isHost: false,
  activeSession: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      if (action.payload === "") state.isHost = false;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setHost: (state, action: PayloadAction<boolean>) => {
      state.isHost = action.payload;
    },
    loginHost: (
      state,
      action: PayloadAction<{
        username: string;
        _id: string;
        activeQuiz: SessionData | null;
      }>
    ) => {
      console.log("PAYLOAD: ", action.payload)
      state.isHost = true;
      state.username = action.payload.username;
      state.userId = action.payload._id;
      state.activeSession = action.payload.activeQuiz;
    },
    clearUserData: (state) => {
      state.activeSession = initialState.activeSession;
      state.username = initialState.username;
      state.userId = initialState.userId;
      state.isHost = initialState.isHost;
    },
  },
});

export const { setUsername, setHost, loginHost, clearUserData } = userSlice.actions;

export default userSlice.reducer;
