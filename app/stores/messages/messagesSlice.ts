import { IMessage } from 'react-native-gifted-chat';

import { NewMessageFromSocket, UpdateMessageStatusPayload } from '@Models/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MessagesState {
  groupMessages: {
    [groupId: string]: {
      messages: IMessage[];
      count: number;
    };
  };
}

const initialState: MessagesState = {
  groupMessages: {},
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(
      state,
      action: PayloadAction<{ list: IMessage[]; count: number; groupId: string }>,
    ) {
      const { groupId, count, list } = action.payload;

      state.groupMessages[groupId] = {
        messages: list,
        count: count,
      };
    },

    addNewMessageToCurrentGroup(state, action: PayloadAction<NewMessageFromSocket>) {
      const { groupId, newMessage } = action.payload;

      if (groupId && state.groupMessages[groupId]) {
        state.groupMessages[groupId].messages = [
          newMessage,
          ...state.groupMessages[groupId].messages,
        ];
        state.groupMessages[groupId].count += 1;
      }
      return;
    },

    updateMessageToReceivedStatus(state, action: PayloadAction<UpdateMessageStatusPayload>) {
      const { groupId, messageId } = action.payload;

      if (state.groupMessages[groupId]) {
        const messageIndex = state.groupMessages[groupId].messages.findIndex(
          (message) => message._id === messageId,
        );

        if (messageIndex !== -1) {
          state.groupMessages[groupId].messages[messageIndex].received = true;
        }
      }
    },
  },
});

export const messagesActions = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
