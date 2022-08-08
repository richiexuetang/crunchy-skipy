import { createReducer } from '@reduxjs/toolkit';
import { setBasicToken, setBearerTokenAndAuthenticate } from './actions/actions';

export interface AuthenticationState {
    basicToken: string;
    bearerToken: string;
    invalidPageAccess: boolean;
    hasAuthenticated: boolean;
}

export const initialState: AuthenticationState = {
  basicToken: localStorage.getItem('Basic') ?? '',
  bearerToken: localStorage.getItem('Bearer') ?? '',
  invalidPageAccess: true,
  hasAuthenticated: 
        (window.location.href.includes('beta.crunchyroll.com') && localStorage.getItem('Bearer') !== '')
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(setBasicToken, (state, action) => {
      state.basicToken = action.payload;
    })
    .addCase(setBearerTokenAndAuthenticate, (state, action) => {
      state.hasAuthenticated = action.payload;
    })
});
