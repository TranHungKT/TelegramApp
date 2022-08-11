import { useDispatch } from 'react-redux';
import createDebugger from 'redux-flipper';

import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';

import { userReducer } from './user';

export const reducer = {
  user: userReducer,
};

export type RootState = StateFromReducersMapObject<typeof reducer>;

export const createStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createDebugger()),
  });

export const store = createStore();

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
