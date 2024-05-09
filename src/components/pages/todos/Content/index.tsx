import { useCallback, useEffect, useState } from "react"
import { getTodos, ITodo, ITodoResponse, TodoStatus } from "@/services/todo";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "next-i18next";
import { Wrapper } from "./Wrapper";

const DEFAULT_PAGE_SIZE = 5;

export const Content = () => {
  const { t } = useTranslation()

  const [todos, set] = useState<Record<TodoStatus, ITodoResponse>>({
    [TodoStatus.TODO]: { todos: [], hasNext: false },
    [TodoStatus.IN_PROGRESS]: { todos: [], hasNext: false },
    [TodoStatus.DONE]: { todos: [], hasNext: false }
  });

  const [pageSize, setPageSize] = useState({
    [TodoStatus.TODO]: DEFAULT_PAGE_SIZE,
    [TodoStatus.IN_PROGRESS]: DEFAULT_PAGE_SIZE,
    [TodoStatus.DONE]: DEFAULT_PAGE_SIZE,
  });


  const setTodos = (status: TodoStatus, data: { todos: ITodo[], hasNext: boolean }) => set((prev) => ({ ...prev, [status]: data }));

  const user = useSelector((state: RootState) => state.auth.user);

  const fetchTodoList = useCallback(
    async (status: TodoStatus[] = [TodoStatus.TODO, TodoStatus.IN_PROGRESS, TodoStatus.DONE], pageS?: number) => {
      try {
        Promise.all(status.map(async (status) => {
          const { data: { data } } = await getTodos({ status, pageSize: pageS ?? pageSize[status] })
          if (data) {
            setTodos(status, data)
          }
        }))
      } catch (error) {
        console.error('Error fetching todo list:', error);
      }
    }
    , [pageSize]
  )

  useEffect(() => {
    if (user) {
      fetchTodoList()
    }
  }, [user])

  const renderWrapper = useCallback(
    ({ title, status, todos }: { title: string, status: TodoStatus, todos: ITodoResponse }) => {
      return <Wrapper
        key={status}
        refresh={fetchTodoList}
        title={title}
        status={status}
        data={todos}
        setPageSize={(status: TodoStatus, pageSize: number) => setPageSize((prev) => ({ ...prev, [status]: pageSize }))}
      />
    }, []
  )

  return (
    <div className="flex my-4 gap-8">
      <DndProvider backend={HTML5Backend}>
        {[TodoStatus.TODO, TodoStatus.IN_PROGRESS, TodoStatus.DONE].map((status) =>
          renderWrapper({ title: t(`common:${status?.toLowerCase()}`), status, todos: todos[status] })
        )}
      </DndProvider>
    </div>
  )
}