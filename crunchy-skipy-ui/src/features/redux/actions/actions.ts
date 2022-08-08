import { createAction } from '@reduxjs/toolkit';

export const setBasicToken = createAction('setBasicToken', (accountAuthClientId: string) => {
    if (accountAuthClientId) {
        localStorage.setItem('Authorization', `Basic ${btoa(`${accountAuthClientId}:`)}`);
    }
    return {
        payload: localStorage.getItem('Authorization') || ''
    }
});

export const setBearerTokenAndAuthenticate = createAction('setBearerTokenAndAuthenticate', (response: any) => {
    localStorage.setItem('Bearer', `Bearer ${btoa(`${response.access_token}:`)}`);
    return {
        payload: true
    }
});