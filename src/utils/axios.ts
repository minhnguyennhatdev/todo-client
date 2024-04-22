import Axios, { AxiosRequestConfig } from "axios";

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

type AxiosResponse<T> = {
    data: T;
    status: number;
}

export const httpRequest = async <T = any>(
    request: AxiosRequestConfig & { query?: Record<string, string> }
): Promise<AxiosResponse<T>> => {
    const { query } = request;
    if (query) {
        request.url += `?${new URLSearchParams(query).toString()}`;
        delete request.query;
    }
    const { data } = await axios<AxiosResponse<T>>(request);
    return data;
};
