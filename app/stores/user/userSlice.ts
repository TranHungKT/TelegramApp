import { UserData } from 'models';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: UserData;
}

const initialState: UserState = {
  user: {
    firstName: '',
    lastName: '',
    id: '',
    email: '',
    accessToken: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserData>) {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
