import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const getGroupsSelector = (state: RootState) => state.groups.groups;
export const getCurrentGroupIdSelector = (state: RootState) => state.groups.currentGroupId;

export const currentGroupSelector = createSelector(
  getGroupsSelector,
  getCurrentGroupIdSelector,
  (groups, currentGroupId) => {
    return currentGroupId ? groups[currentGroupId] : undefined;
  },
);

export const getIsTypingUserSelector = createSelector(
  getGroupsSelector,
  (groups) =>
    ({ groupId }: { groupId: string }) => {
      return groups[groupId].usersTyping;
    },
);

const getNumberOfUnReadMessages = (state: RootState) => state.groups.unReadMessages;

export const getNumberOfUnReadMessagesSelector = createSelector(
  getNumberOfUnReadMessages,
  (unReadMessages) =>
    ({ groupId }: { groupId: string }) => {
      return unReadMessages[groupId];
    },
);
