import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const getGroupsSelector = (state: RootState) => state.groups.groups;
export const getCurrentGroupIdSelector = (state: RootState) => state.groups.currentGroupId;

export const currentGroupSelector = createSelector(
  getGroupsSelector,
  getCurrentGroupIdSelector,
  (groups, currentGroupId) => {
    return groups.find((group) => group._id === currentGroupId);
  },
);

export const getIsTypingUserSelector = createSelector(
  getGroupsSelector,
  (groups) =>
    ({ groupId }: { groupId: string }) => {
      const currentGroupIndex = groups.findIndex((group) => group._id === groupId);

      if (currentGroupIndex === -1) {
        return [];
      }

      return groups[currentGroupIndex].usersTyping;
    },
);
