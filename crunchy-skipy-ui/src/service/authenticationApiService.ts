import { TokenResponseDto } from '../api';
import { authenticationApi } from './network-agents';

export const postTokenInformation = async (
  requestBody: string,
  onSuccess: (data: TokenResponseDto) => void,
  onError: () => void,
): Promise<void> => {
  try {
    const { data } = await authenticationApi.postToken(requestBody);
    onSuccess(data);
  } catch (error) {
    onError();
  }
}

export const getIndexData = async (
  onSuccess: () => void,
  onError: () => void,
): Promise<void> => {
  try {
    await authenticationApi.getIndex();
    onSuccess();
  } catch (error) {
    onError();
  }
}