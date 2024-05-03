import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_TODO_SERVER_URL,
    validateStatus: () => true,
});

axios.interceptors.request.use(
    async (config) => {
        if (
            typeof localStorage !== "undefined" &&
            !config?.headers?.Authorization
        ) {
            config.headers.Authorization = `Bearer ${localStorage?.getItem(
                "accessToken"
            )}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

type Response<T> = {
    data: T;
    statusCode: number;
    message: string;
};

export const httpRequest = async <T = any>(
    request: AxiosRequestConfig & { query?: Record<string, string> }
): Promise<{ status: number; data: Response<T> }> => {
    const { query } = request;
    if (query) {
        request.url += `?${new URLSearchParams(query).toString()}`;
        delete request.query;
    }
    const {
        data,
        status,
    } = await axios<Response<T>>(request);
    return { data, status };
};
