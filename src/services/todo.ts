import { httpRequest } from "@/utils/axios";
import axios from "axios";

export interface ITodo {
    id: number;
    userId: number;
    title: string;
    description: string;
}

export const getTodos = async () => {
    const { data } = await httpRequest<ITodo[]>({
        method: "GET",
        url: "/api/todos",
    });
    return data;
};

export type AddTodo = Pick<ITodo, "title" | "description">;
export const addTodo = async (todo: AddTodo) => {
    const data = await httpRequest<any>({
        method: "POST",
        url: "/api/todos",
        data: todo,
    });
    return data;
};

export const deleteTodo = async (id: number) => {
    const data = await httpRequest<boolean>({
        method: "DELETE",
        url: `/api/todos/${id}`,
    });
    return data;
};
