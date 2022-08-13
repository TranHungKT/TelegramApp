import { User } from 'models';

import { DEFAULT_USER_DATA } from '@Constants/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userData: User;
}

const initialState: UserState = {
  userData: DEFAULT_USER_DATA,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<User>) {
      state.userData = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
