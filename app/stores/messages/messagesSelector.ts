import { createSelector } from '@reduxjs/toolkit';

import { getCurrentGroupIdSelector } from '../groups/groupsSelector';
import { RootState } from '../store';

export const getGroupMessagesSelector = (state: RootState) => state.messages.groupMessages;

export const getMessagesForGroupSelector = createSelector(
  getGroupMessagesSelector,
  getCurrentGroupIdSelector,
  (groupsMessages, groupId) => {
    return groupsMessages.find((group) => group.groupId === groupId);
  },
);
