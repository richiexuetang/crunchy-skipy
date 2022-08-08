import { AxiosResponse } from 'axios';
import { ApiRoute } from '../../api';
import { TokenResponseDto, CMSObject } from '../../api/contracts';
import { BaseApi } from './base.api';

export class Authentication {
    private axiosInstance = BaseApi.getInstance().axiosInstance;

    public postToken(requestInformation: string): Promise<AxiosResponse<TokenResponseDto>> {
        return this.axiosInstance.post(ApiRoute.PostToken, requestInformation);
    }

    public getIndex(): Promise<AxiosResponse<CMSObject>> {
        return this.axiosInstance.get(ApiRoute.GetIndex);
    }
}

export const authenticationApi = new Authentication();
