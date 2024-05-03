import { useCallback, useEffect, useState } from "react"
import { Wrapper } from "./Wrapper"
import { getTodos, ITodo, TodoStatus } from "@/services/todo";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const Content = () => {
  const [todos, set] = useState<Record<TodoStatus, ITodo[]>>({
    [TodoStatus.TODO]: [],
    [TodoStatus.IN_PROGRESS]: [],
    [TodoStatus.DONE]: [],
  });

  const setTodos = (status: TodoStatus, data: ITodo[]) => set((prev) => ({ ...prev, [status]: data }));

  const user = useSelector((state: RootState) => state.auth.user);

  const fetchTodoList = useCallback(
    async (status: TodoStatus[] = [TodoStatus.TODO, TodoStatus.IN_PROGRESS, TodoStatus.DONE]) => {
      try {
        Promise.all(status.map(async (status) => {
          const data = await getTodos(status)
          if (data) {
            setTodos(status, data.todos)
          }
        }))
      } catch (error) {
        console.error('Error fetching todo list:', error);
      }
    }
    , [])

  useEffect(() => {
    if (user) {
      fetchTodoList()
    }
  }, [fetchTodoList, user])

  const renderWrapper = ({ title, status }: { title: string, status: TodoStatus }) => {
    return <Wrapper
      refresh={fetchTodoList}
      title={title}
      status={status}
      data={todos?.[status].filter(t => t.status === status)}
    />
  }

  return (
    <div className="flex my-4 gap-8">
      <DndProvider backend={HTML5Backend}>
        {renderWrapper({ title: "Todo", status: TodoStatus.TODO })}
        {renderWrapper({ title: "In Progress", status: TodoStatus.IN_PROGRESS })}
        {renderWrapper({ title: "Done", status: TodoStatus.DONE })}
      </DndProvider>
    </div>
  )
}