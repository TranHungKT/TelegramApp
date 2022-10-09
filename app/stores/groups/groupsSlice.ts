import { normalizeGroup } from 'utils/groupUtils';

import { GetListGroupResponse, Group, LastMessage, TypingEventPayload } from '@Models/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GroupState {
  groups: {
    [key: string]: Group;
  };
  count: number;
  currentGroupId?: string;
}

const initialState: GroupState = {
  groups: {},
  count: 0,
};

export const groupsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setGroups(state, action: PayloadAction<{ data: GetListGroupResponse; userId: string }>) {
      const { data, userId } = action.payload;

      data.list.forEach((groupResponse) => {
        state.groups[groupResponse._id] = normalizeGroup(groupResponse, userId);
      });

      state.count = data.count;
    },

    setCurrentGroupId(state, action: PayloadAction<string>) {
      state.currentGroupId = action.payload;
    },

    setLastMessage(state, action: PayloadAction<{ message: LastMessage; groupId?: string }>) {
      const { message, groupId } = action.payload;
      if (groupId) {
        state.groups[groupId].lastMessage = message;
      }
    },

    setTypingEvent(state, action: PayloadAction<TypingEventPayload>) {
      const { groupId } = action.payload;

      if (groupId) {
        const user = state.groups[groupId].usersTyping.find(
          (currentUser) => currentUser._id === action.payload.user._id,
        );

        if (!user) {
          state.groups[groupId].usersTyping = [
            ...state.groups[groupId].usersTyping,
            action.payload.user,
          ];
        }
      }
    },

    unTypingEvent(state, action: PayloadAction<TypingEventPayload>) {
      const { groupId } = action.payload;

      if (groupId) {
        const index = state.groups[groupId].usersTyping.findIndex(
          (user) => user._id === action.payload.user._id,
        );

        state.groups[groupId].usersTyping.splice(index, 1);
      }
    },
  },
});

export const groupsActions = groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;
