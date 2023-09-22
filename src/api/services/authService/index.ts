import { AxiosInstance } from "src/api";
import { API_ROUTES } from "src/constants/api/routes";
import { IAuthForm } from 'src/types/auth/auth-form';
import { IUser } from "src/types/auth/user";


export const authService = {
    register(data: {username: string, password: string, token: string}) {
        return AxiosInstance.post(API_ROUTES.AUTH.REGISTER, {
            username: data.username,
            password: data.password,
            token: data.token
        });
    },
    login(data: IAuthForm) {
        return AxiosInstance.get<IUser[]>(API_ROUTES.AUTH.LOGIN, { params: data });
    },
};