import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.NEXT_APP_PUBLIC_TODO_SERVER_URL,
    validateStatus: () => true,
});

interface Request {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    data?: unknown;
    query?: Record<string, any>;
}

export const httpRequest = async (request: Request) => {
    const { query } = request;
    if (query) {
        request.url += `?${new URLSearchParams(query).toString()}`;
        delete request.query;
    }
    const { data } = await axios(request);
    console.log(data);
    return data;
};
