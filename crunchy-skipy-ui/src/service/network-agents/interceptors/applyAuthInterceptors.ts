import { AxiosRequestConfig } from 'axios';

export const applyAuthInterceptors = (requestConfig: AxiosRequestConfig): AxiosRequestConfig => {
    try {
        const basicToken: string = localStorage.getItem('Authorization') || '';
        const bearerToken: string = localStorage.getItem('Bearer') || '';

        if (bearerToken !== null && requestConfig && requestConfig.headers) {
            requestConfig.headers.Authorization = bearerToken;
        } else if (basicToken !== null && requestConfig && requestConfig.headers) {
            requestConfig.headers.Authorization = basicToken;
        }

    } catch (error) {
        throw new Error();
    }
    requestConfig.withCredentials = true;
    return requestConfig;
}