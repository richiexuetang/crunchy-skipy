import axios, { AxiosInstance } from 'axios';
import { applyAuthInterceptors } from '../network-agents/interceptors/applyAuthInterceptors';

export class BaseApi {
    private static instance: BaseApi;
    public axiosInstance: AxiosInstance = axios.create({
        baseURL: 'https://beta-api.crunchyroll.com/',
        withCredentials: true
    });

    private constructor() {
        this.axiosInstance.interceptors.request.use(applyAuthInterceptors);
    }

    public static getInstance(): BaseApi {
        if (!BaseApi.instance) {
            BaseApi.instance = new BaseApi();
        }
        return BaseApi.instance;
    }

    public getBaseUrl(): string {
        return this.axiosInstance.defaults.baseURL || '';
    }

    public setBaseUrl(baseUrl: string) {
        this.axiosInstance.defaults.baseURL = baseUrl;
    }
}