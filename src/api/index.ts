import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiConfig } from './config';

declare module 'axios' {
    export interface AxiosRequestConfig {
        customCache?: boolean;
    }
}

export interface IAxiosErrorResponse {
    response?: {
        status?: string;
        statusText?: string;
        data?: {
            status?: string;
            message?: string;
        };
    };
}

const APIInstance = () => {
    const instance = Axios.create(ApiConfig);
    return {
        get: <T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig, cache: boolean = false): Promise<R> => {
            return instance.get(url, {
                ...config,
                customCache: cache,
            });
        },

        post: <T, B = {}, R = AxiosResponse<T>>(url: string, data?: B, config?: AxiosRequestConfig): Promise<R> => {
            return instance.post(url, data, config);
        },

        put: <T, B = {}, R = AxiosResponse<T>>(url: string, data?: B, config?: AxiosRequestConfig): Promise<R> => {
            return instance.put(url, data, config);
        },

        path: <T, B = {}, R = AxiosResponse<T>>(url: string, data?: B, config?: AxiosRequestConfig): Promise<R> => {
            return instance.patch(url, data, config);
        },

        delete: <T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
            return instance.delete(url, config);
        },

        deleteByBody: <T, B = {}, R = AxiosResponse<T>>(url: string, data?: B, config?: AxiosRequestConfig): Promise<R> => {
            return instance.delete(url, {
                data,
                ...config,
            });
        },

        // Result managers
        GetSuccessData: <T>(response: AxiosResponse<T>): T => {
            return response.data;
        },

        GetFailureData: <T extends { status: string; message: string }>(error: AxiosError<T>) => {
            console.error('>>> 111 ERROR:', { error, errorEesponse: error.response?.data });
            return {
                errorCode: error.response?.data?.status || '',
                errorMessage: error.response?.data?.message || '',
                errorResponse: error.response?.data || '',
            };
        },
    };
};

export const AxiosInstance = APIInstance();
