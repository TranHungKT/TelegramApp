import { normalizeListGroups } from 'utils/groupUtils';

import { GetListGroupResponse, Group } from '@Models/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GroupState {
  groups: Group[];
  count: number;
  currentGroupId?: string;
}

const initialState: GroupState = {
  groups: [],
  count: 0,
};

export const groupsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setGroups(state, action: PayloadAction<{ data: GetListGroupResponse; userId: string }>) {
      const { data, userId } = action.payload;
      state.groups = normalizeListGroups(data.list, userId);
      state.count = data.count;
    },

    setCurrentGroupId(state, action: PayloadAction<string>) {
      state.currentGroupId = action.payload;
    },
  },
});

export const groupsActions = groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;
