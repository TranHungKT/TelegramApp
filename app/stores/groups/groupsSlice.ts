import { normalizeListGroups } from 'utils/groupUtils';

import { GetListGroupResponse, Group, LastMessage, TypingEventPayload } from '@Models/index';
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

    setLastMessage(state, action: PayloadAction<{ message: LastMessage; groupId?: string }>) {
      const currentGroupIndex = state.groups.findIndex(
        (group) => group._id === action.payload.groupId,
      );

      if (currentGroupIndex !== -1) {
        state.groups[currentGroupIndex].lastMessage = action.payload.message;
      }
    },

    setTypingEvent(state, action: PayloadAction<TypingEventPayload>) {
      const currentGroupIndex = state.groups.findIndex(
        (group) => group._id === action.payload.groupId,
      );

      if (currentGroupIndex !== -1) {
        state.groups[currentGroupIndex].usersTyping = [
          ...state.groups[currentGroupIndex].usersTyping,
          action.payload.user,
        ];
      }
    },

    unTypingEvent(state, action: PayloadAction<TypingEventPayload>) {
      const currentGroupIndex = state.groups.findIndex(
        (group) => group._id === action.payload.groupId,
      );

      if (currentGroupIndex !== -1) {
        const index = state.groups[currentGroupIndex].usersTyping.findIndex(
          (id) => id === action.payload.user,
        );

        state.groups[currentGroupIndex].usersTyping.splice(index, 1);
      }
    },
  },
});

export const groupsActions = groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;
