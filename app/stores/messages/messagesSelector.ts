import { userIdSelector } from 'stores/user';

import { createSelector } from '@reduxjs/toolkit';

import { getCurrentGroupIdSelector } from '../groups/groupsSelector';
import { RootState } from '../store';

export const getGroupMessagesSelector = (state: RootState) => state.messages.groupMessages;

export const getMessagesForGroupSelector = createSelector(
  getGroupMessagesSelector,
  getCurrentGroupIdSelector,
  (groupsMessages, groupId) => {
    return groupId ? groupsMessages[groupId] : undefined;
  },
);

export const getMessagesUnReceivedByGroupIdSelector = createSelector(
  getGroupMessagesSelector,
  userIdSelector,
  (groupsMessages, userId) =>
    ({ groupId }: { groupId: string }) => {
      if (groupsMessages[groupId]) {
        return groupsMessages[groupId].messages.filter(
          (message) => message.user._id !== userId && !message.received,
        );
      }
    },
);

export const getMessagesUnSeenByGroupIdSelector = createSelector(
  getGroupMessagesSelector,
  userIdSelector,
  (groupsMessages, userId) =>
    ({ groupId }: { groupId: string }) => {
      if (groupsMessages[groupId]) {
        return groupsMessages[groupId].messages.filter(
          (message) => message.user._id !== userId && !message.seen,
        );
      }
    },
);
