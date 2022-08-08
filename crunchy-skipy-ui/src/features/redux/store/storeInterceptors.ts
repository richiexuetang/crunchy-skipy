import { Store } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const applyNetworkTrafficObserver = (store: Store) =>
    (requestConfig: AxiosRequestConfig): AxiosRequestConfig => {
        const requestUrl = requestConfig.url ?? 'anonymous-request'
        return requestConfig;
    }