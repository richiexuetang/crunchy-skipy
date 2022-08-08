import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { rootReducer } from '..'
import { BaseApi } from '../../../service/network-agents/base.api';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true,
    })
});

/* BaseApi.getInstance().applyInterceptors(
    {
        onFulfilled: applyNetworkTrafficObserver(store),
    },
    {
        onFulfilled: applyNetworkCompleteObserver(store),
        onRejected: applyNetworkErrorLogger(store),
    }
);*/

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;