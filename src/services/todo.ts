import { httpRequest } from "@/utils/axios";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";

export const TodoStatus = {
    DONE: "DONE",
    IN_PROGRESS: "IN_PROGRESS",
    TODO: "TODO",
} as const;

export type TodoStatus = keyof typeof TodoStatus;

export interface ITodo {
    id: number;
    userId: number;
    title: string;
    description: string;
    status: TodoStatus;
    createdAt: string;
}

export const getTodos = async (_status?: TodoStatus) => {
    const { data, status } = await httpRequest<{
        todos: ITodo[];
        hasNext: boolean;
    }>({
        method: "GET",
        url: "/api/todos" + (_status ? `?status=${_status}` : ""),
    });
    return { data, status };
};

export type AddTodo = Pick<ITodo, "title" | "description" | "status">;
export const addTodo = async (todo: AddTodo) => {
    const { data, status } = await httpRequest<any>({
        method: "POST",
        url: "/api/todos",
        data: todo,
    });
    if (status === HttpStatusCode.Ok) {
        toast.info("Todo added successfully");
    }
    return { data, status };
};

export const deleteTodo = async (id: number) => {
    const { data, status } = await httpRequest<boolean>({
        method: "DELETE",
        url: `/api/todos/${id}`,
    });
    if (status === HttpStatusCode.Ok) {
        toast.error("Todo deleted successfully");
    }
    return data;
};

export const updateTodo = async (id: number, toStatus: TodoStatus) => {
    const { data, status } = await httpRequest({
        method: "PUT",
        url: `/api/todos/${id}`,
        data: { status: toStatus },
    });
    if (status === HttpStatusCode.Ok) {
        toast.info("Todo updated successfully");
    }
    return data;
};
