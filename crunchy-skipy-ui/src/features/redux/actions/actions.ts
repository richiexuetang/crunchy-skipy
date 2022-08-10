import { createAction } from '@reduxjs/toolkit';
import { error, log } from '../../../common/utils/log';
import { authenticationApi } from '../../../service/network-agents';
import { AppThunk } from '../store/store';

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

export const authenticateWithBasic = (): AppThunk => async (dispatch) => {
  try {
    const basicAuth = localStorage.getItem('Authorization')?.split(' ');
    if (basicAuth && basicAuth[0] === 'Basic') {
      const { data } = await authenticationApi.postToken('grant_type=etp_rt_cookie');
      log('data from postToken', data);

      localStorage.setItem('Authorization', `Bearer ${data.access_token}`);

      const indexResponse = await authenticationApi.getIndex();
      log('indexResponse is:', indexResponse);
    }
  } catch (err) {
    error('setBearerToken failed with:', err);
  }
}