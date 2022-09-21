import { IMessage } from 'react-native-gifted-chat';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MessagesState {
  groupMessages: { groupId: string; messages: IMessage[]; count: number }[];
  currentGroupId?: string;
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
      state.groupMessages = [
        ...state.groupMessages,
        {
          groupId,
          messages: list,
          count,
        },
      ];
    },

    setCurrentGroupId(state, action: PayloadAction<string | undefined>) {
      state.currentGroupId = action.payload;
    },
  },
});

export const messagesActions = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
