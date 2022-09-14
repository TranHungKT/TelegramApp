import { RootState } from '../store';

export const currentGroupSelector = (state: RootState) => state.groups.currentGroup;
