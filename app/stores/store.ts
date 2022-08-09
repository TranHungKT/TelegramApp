import { useDispatch } from 'react-redux';

import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';

export const reducer = {};

export type RootState = StateFromReducersMapObject<typeof reducer>;

export const createStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer,
    preloadedState,
  });

export const store = createStore();

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
