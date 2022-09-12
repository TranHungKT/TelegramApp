import { RootState } from '../store';

export const userDataSelector = (state: RootState) => state.user.userData;
export const userTokenSelector = (state: RootState) => state.user.userData.accessToken;
export const userIdSelector = (state: RootState) => state.user.userData.id;
