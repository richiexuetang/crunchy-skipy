import { combineReducers } from '@reduxjs/toolkit';
import authentication from './authentication';

export const rootReducer = combineReducers({
    authentication,
});

export type RootState = ReturnType<typeof rootReducer>;