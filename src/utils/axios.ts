import Axios, { AxiosRequestConfig } from "axios";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_TODO_SERVER_URL,
    validateStatus: () => true,
});

axios.interceptors.request.use(
    async (config) => {
        if(typeof localStorage !== 'undefined' || !config?.headers?.Authorization) {
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

export const httpRequest = async (
    request: AxiosRequestConfig & { query?: Record<string, string> }
) => {
    const { query } = request;
    if (query) {
        request.url += `?${new URLSearchParams(query).toString()}`;
        delete request.query;
    }
    const { data } = await axios(request);
    return data;
};
