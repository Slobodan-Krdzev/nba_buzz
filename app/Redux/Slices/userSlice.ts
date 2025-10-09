import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/app/Types/Types";

export type UserState = {
  currentUser: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
};

const initialState: UserState = {
  currentUser: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfile | null>) {
      state.currentUser = action.payload;
      state.isAuthenticated = Boolean(action.payload);
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.isAuthenticated = Boolean(action.payload || state.currentUser);
    },
    clearUser(state) {
      state.currentUser = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setToken, clearUser } = userSlice.actions;
export default userSlice.reducer;


