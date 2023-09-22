export interface IAxiosResponse<T = {}> {
    data: T;
    message: string;
    errors?: { [key: string]: string[] };
    success?: boolean;
}