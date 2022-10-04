import { IMessage } from 'react-native-gifted-chat';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MessagesState {
  groupMessages: { groupId: string; messages: IMessage[]; count: number }[];
}

const initialState: MessagesState = {
  groupMessages: [],
};

export const messagesSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMessages(
      state,
      action: PayloadAction<{ list: IMessage[]; count: number; groupId: string }>,
    ) {
      const { groupId, count, list } = action.payload;
      const group = state.groupMessages.findIndex(
        (currentGroup) => currentGroup.groupId === groupId,
      );

      if (group === -1) {
        state.groupMessages = [
          ...state.groupMessages,
          {
            groupId,
            messages: list,
            count,
          },
        ];
      }
    },

    addNewMessageToCurrentGroup(
      state,
      action: PayloadAction<{ message: IMessage; currentGroupId?: string }>,
    ) {
      const { currentGroupId, message } = action.payload;

      const groupIndex = state.groupMessages.findIndex(
        (currentGroup) => currentGroup.groupId === currentGroupId,
      );

      if (groupIndex !== -1) {
        state.groupMessages[groupIndex].messages = [
          message,
          ...state.groupMessages[groupIndex].messages,
        ];
        state.groupMessages[groupIndex].count += 1;
      }
      return;
    },
  },
});

export const messagesActions = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
