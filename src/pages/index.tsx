import { Layout } from "@/components/Layout";
import { RootState } from "@/redux/store";
import { AddTodo, addTodo, deleteTodo, getTodos, ITodo } from "@/services/todo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Todo() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const [input, setInput] = useState<AddTodo>({
    title: '',
    description: '',
  })

  const user = useSelector((state: RootState) => state.auth.user);

  const fetchTodoList = useCallback(async () => {
    try {
      const data = await getTodos()
      if (data) {
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

  const handleAddTodo = useCallback(async (input: AddTodo) => {
    try {
      const data = await addTodo(input)
      console.log(data)
      if (data?.data) {
        setInput({ title: '', description: '' });
        fetchTodoList()
      } 
      if(data?.message) {
        toast.error(data?.message)
      } else {
        toast.info('Task added')
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }, [fetchTodoList])

  const handleDeleteTodo = useCallback(async (id: number) => {
    try {
      const data = await deleteTodo(id)
      if(data?.data) {
        toast.warn('Task removed')
      }
      fetchTodoList()
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }, [fetchTodoList])

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
      {todos?.map((todo: ITodo, index: number) => {
        return (
          <div key={index}>
            {renderLayout(
              todo.title,
              <div className="w-full flex justify-between">
                <span>{todo.description}</span>
                <span className="text-red-600 cursor-pointer" onClick={() => handleDeleteTodo(todo.id)}>X</span>
              </div>)}
          </div>
        )
      })}
    </div>
  }, [handleDeleteTodo, renderLayout, todos])

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
            onClick={() => handleAddTodo(input)}
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
