import { httpRequest } from "@/utils/axios";

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

export const getTodos = async (status?: TodoStatus) => {
    const { data } = await httpRequest<{ todos: ITodo[]; hasNext: boolean }>({
        method: "GET",
        url: "/api/todos" + (status ? `?status=${status}` : ""),
    });
    return data;
};

export type AddTodo = Pick<ITodo, "title" | "description" | 'status'>;
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
