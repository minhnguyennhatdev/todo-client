import { httpRequest } from "@/utils/axios";

export const authenticated = async (token: string) => {
    const { data } = await httpRequest({
        url: `/api/authenticated?token=${token}`,
        method: "GET",
    });
    return { data };
};

export const me = async () => {
    const { data, status } = await httpRequest({
        url: "/api/authenticated/me",
        method: "GET",
    });
    return { data, status };
};
