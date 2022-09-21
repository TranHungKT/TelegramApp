import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const getGroupMessagesSelector = (state: RootState) => state.messages.groupMessages;
export const getCurrentGroupIdSeletor = (state: RootState) => state.messages.currentGroupId;

export const getMessagesForGroupSelector = createSelector(
  getGroupMessagesSelector,
  getCurrentGroupIdSeletor,
  (groups, groupId) => {
    return groups.find((group) => group.groupId === groupId);
  },
);
