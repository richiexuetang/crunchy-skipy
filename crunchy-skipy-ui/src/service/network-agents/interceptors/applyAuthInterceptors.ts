import { AxiosRequestConfig } from 'axios';

export const applyAuthInterceptors = (requestConfig: AxiosRequestConfig): AxiosRequestConfig => {
    try {
        const authorizationHeader: string = localStorage.getItem('Authorization') || '';

        if (authorizationHeader !== null && requestConfig && requestConfig.headers) {
            requestConfig.headers.Authorization = authorizationHeader;
        }
    } catch (error) {
        throw new Error();
    }
    requestConfig.withCredentials = true;
    return requestConfig;
}