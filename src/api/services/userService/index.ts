import { AxiosInstance } from "src/api";
import { IAxiosResponse } from "src/api/types/axios-response";
import { API_ROUTES } from "src/constants/api/routes";


export const authService = {
    register(data: {username: string, password: string, token: string}) {
        return AxiosInstance.post<IAxiosResponse>(API_ROUTES.AUTH.LOGIN, {
            username: data.username,
            password: data.password,
            token: data.token
        });
    },
    login(data: any) {
        return AxiosInstance.get<IAxiosResponse>(API_ROUTES.AUTH.LOGIN, { params: data });
    },
};