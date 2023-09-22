import * as qs from 'qs';
import { baseURL } from 'src/constants/api/base-url';

const paramsSerializer = {
    serialize: (params: Record<string, any>) => qs.stringify(params, { indices: false, arrayFormat: 'indices' }),
};

export const ApiConfig = {
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10 * 1000,
    paramsSerializer,
    withCredentials: false,
};
