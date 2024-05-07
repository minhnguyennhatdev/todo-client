import { httpRequest } from '@/utils/axios';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';

export const TodoStatus = {
  DONE: 'DONE',
  IN_PROGRESS: 'IN_PROGRESS',
  TODO: 'TODO',
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

interface ITodoQuery {
  status: TodoStatus;
  pageSize: number;
}
export interface ITodoResponse {
  todos: ITodo[];
  hasNext: boolean;
}
export const getTodos = async (query: ITodoQuery) => {
  const page = 1;

  const queryString = new URLSearchParams({
    status: query.status,
    page: page.toString(),
    pageSize: query.pageSize.toString(),
  }).toString();

  const { data, status } = await httpRequest<ITodoResponse>({
    method: 'GET',
    url: '/api/todos' + '?' + queryString,
  });
  return { data, status };
};

export type AddTodo = Pick<ITodo, 'title' | 'description' | 'status'>;
export const addTodo = async (todo: AddTodo) => {
  const { data, status } = await httpRequest<any>({
    method: 'POST',
    url: '/api/todos',
    data: todo,
  });
  if (status === HttpStatusCode.Ok) {
    toast.info('Todo added successfully');
  }
  return { data, status };
};

export const deleteTodo = async (id: number) => {
  const { data, status } = await httpRequest<boolean>({
    method: 'DELETE',
    url: `/api/todos/${id}`,
  });
  if (status === HttpStatusCode.Ok) {
    toast.error('Todo deleted successfully');
  }
  return data;
};

export const updateTodo = async (id: number, payload: Partial<ITodo>) => {
  const { data, status } = await httpRequest({
    method: 'PUT',
    url: `/api/todos/${id}`,
    data: payload,
  });
  if (status === HttpStatusCode.Ok) {
    toast.info('Todo updated successfully');
  }
  return { data, status };
};
