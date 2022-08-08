import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import { applyAuthInterceptors } from '../network-agents/interceptors/applyAuthInterceptors';

type ResponseInterceptor = {
    onFulfilled?: (value: AxiosResponse<unknown>) => AxiosResponse<unknown> | Promise<AxiosResponse<unknown>>;
    onRejected?: (error: any) => any;
}

type RequestInterceptor = {
    onFulfilled?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    onRejected?: (error: any) => any;
}

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

  public applyInterceptors(requestInterceptors?: RequestInterceptor, responseInterceptors?: ResponseInterceptor): void {
    if (requestInterceptors) {
      this.axiosInstance.interceptors.request.use(requestInterceptors.onFulfilled, requestInterceptors.onRejected);
    }
    if (responseInterceptors) {
      this.axiosInstance.interceptors.response.use(responseInterceptors.onFulfilled, responseInterceptors.onRejected);
    }
  }
}