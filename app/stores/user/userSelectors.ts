import { RootState } from '../store';

export const userDataSelector = (state: RootState) => state.user.userData;
