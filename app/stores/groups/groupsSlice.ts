import { Group } from '@Models/index';
import { createSlice } from '@reduxjs/toolkit';

export interface GroupState {
  groups?: Group;
}

const initialState: GroupState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
