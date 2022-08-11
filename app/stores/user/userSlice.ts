import { UserData } from 'models';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userData: UserData;
}

const initialState: UserState = {
  userData: {
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
      state.userData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
