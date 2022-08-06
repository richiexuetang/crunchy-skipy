import { AxiosResponse } from 'axios';
import { ApiRoute } from '../../api';
import { TokenResponseDto } from '../../api/contracts';
import { BaseApi } from './base.api';

export class Token {
    private axiosInstance = BaseApi.getInstance().axiosInstance;

    public postToken(requestInformation: string): Promise<AxiosResponse<TokenResponseDto>> {
        return this.axiosInstance.post(ApiRoute.Token, requestInformation);
    }
}

export const tokenApi = new Token();
