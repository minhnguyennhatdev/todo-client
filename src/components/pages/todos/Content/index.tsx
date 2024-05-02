import { useCallback, useEffect, useState } from "react"
import { Wrapper } from "./Wrapper"
import { getTodos, ITodo, TodoStatus } from "@/services/todo";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const Content = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

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

  const renderWrapper = ({ title, type }: { title: string, type: string }) => {
    return <Wrapper refresh={fetchTodoList} title={title} type={type} data={todos.filter(t => t.status === type)} />
  }

  return (
    <div className="flex my-4 gap-8">
      <DndProvider backend={HTML5Backend}>
        {renderWrapper({ title: "Todo", type: TodoStatus.TODO })}
        {renderWrapper({ title: "In Progress", type: TodoStatus.IN_PROGRESS })}
        {renderWrapper({ title: "Done", type: TodoStatus.DONE })}
      </DndProvider>
    </div>
  )
}