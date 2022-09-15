import { Group } from '@Models/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GroupState {
  groups: Group[];
  count: number;
  currentGroup?: Group;
}

const initialState: GroupState = {
  groups: [],
  count: 0,
};

export const groupsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setGroups(state, action: PayloadAction<{ list: Group[]; count: number }>) {
      state.groups = action.payload.list;
      state.count = action.payload.count;
    },

    setCurrentGroup(state, action: PayloadAction<Group>) {
      state.currentGroup = action.payload;
    },
  },
});

export const groupsActions = groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;
