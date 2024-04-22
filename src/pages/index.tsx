import { Layout } from "@/components/Layout";
import { RootState } from "@/redux/store";
import { httpRequest } from "@/utils/axios";
import { Dispatch, HtmlHTMLAttributes, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

interface ITodo {
  title: string;
  description: string;
}

export default function Todo() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState<{ title: string, description: string }>({
    title: '',
    description: '',
  })

  const user = useSelector((state: RootState) => state.auth.user);

  const fetchTodoList = useCallback(async () => {
    try {
      const { data } = await httpRequest({
        url: '/api/todos',
        method: 'GET',
      });
      console.log(data)
      if (data?.length) {
        setTodos(data);
      }
    } catch (error) {
      console.error('Error fetching todo list:', error);
    }
  }, [])

  useEffect(() => {
    if (user) {
      fetchTodoList()
    }
  }, [fetchTodoList, user])

  const renderLayout = useCallback((first: any, second: any) => {
    return (
      <div className="max-w-[600px] flex space-x-2">
        <div className="w-1/3">
          {first}
        </div>
        <div className="w-2/3">
          {second}
        </div>
      </div>
    )
  }, [])

  const renderTodos = useMemo(() => {
    return <div>
      <div className="font-semibold">
      TODO LIST
      </div>
      {todos?.map((todo: any, index: number) => {
        return (
          <div key={index}>
            {renderLayout(todo.title, todo.description)}
          </div>
        )
      })}
    </div>
  }, [todos])

  const renderInput = useCallback((title: string, value: string, setValue: any) => {
    return (
      <div className="w-full">
        <div className="h-6">
          {title}
        </div>
        <div className="h-8">
          <div className=" border-red-200 border rounded-sm px-2 py-1 ">
            <input className="h-full w-full border-none focus:outline-none" value={value} onChange={(e) => setValue(e?.target?.value)} />
          </div>
        </div>
      </div>
    )
  }, [])

  const handleAddTodo = useCallback(async (title: string, description: string) => {
    try {
      const { data } = await httpRequest({
        url: '/api/todos',
        method: 'POST',
        data: {
          title,
          description,
        },
      });
      if (data) {
        setInput({ title: '', description: '' });
        fetchTodoList()
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }, [fetchTodoList])

  return (
    <Layout>
      {user ? <div className="py-20 flex justify-center">
        <div>
          {renderLayout(
            renderInput('Title', input.title, (value: string) => setInput({ ...input, title: value })),
            renderInput('Description', input.description, (value: string) => setInput({ ...input, description: value }))
          )}
          <div
            className="hover:text-red-500 cursor-pointer mt-2 text-green-700"
            onClick={() => handleAddTodo(input.title, input.description)}
          >
            Add
          </div>

          <div className="mt-8">
            {renderTodos}
          </div>
        </div>
      </div> : <div className="w-full flex justify-center">Please login first</div>}
    </Layout>
  );
}
