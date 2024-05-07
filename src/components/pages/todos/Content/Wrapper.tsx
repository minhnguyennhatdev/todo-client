import { ITodo, ITodoResponse, TodoStatus, updateTodo } from "@/services/todo"
import { Card } from "./Card"
import { useDrop } from "react-dnd"
import _ from "lodash"
import { useState } from "react"
import { Overlay } from "@/components/commons/Overlay"
import ClipLoader from "react-spinners/ClipLoader";
import { TaskModal } from "./TaskModal"
import { useTranslation } from "next-i18next"

interface WrapperProps {
  title: string,
  data: ITodoResponse,
  status: TodoStatus,
  refresh: (status?: TodoStatus[], pageSize?: number) => void
  setPageSize: (status: TodoStatus, pageSize: number) => void
}

export const Wrapper = ({ title, data, status, refresh, setPageSize }: WrapperProps) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [showAddTask, setShowAddTask] = useState<boolean | ITodo>(false)

  const handleLoadMore = _.throttle(async () => {
    try {
      setLoading(true)
      const newPageSize = data?.todos?.length + 5
      await setPageSize(status, newPageSize)
      await refresh?.([status], newPageSize)
    } catch (error) {
      console.error('Error loading more todos:', error);
    } finally {
      setLoading(false)
    }
  }, 300)

  const handleUpdateTodoStatus = _.throttle(
    async ({ id, fromStatus, toStatus }: { id: number, fromStatus: TodoStatus, toStatus: TodoStatus }) => {
      try {
        setLoading(true)
        await updateTodo(id, { status: toStatus })
        refresh?.()
      } catch (error) {
        console.error('Error updating todo status:', error);
      } finally {
        setLoading(false)
      }
    }
    , 300)

  const [, drop] = useDrop(() => ({
    accept: Object.values(TodoStatus).filter((_status) => _status !== status),
    drop: (item: ITodo, _monitor) => {
      handleUpdateTodoStatus({ id: item.id, fromStatus: item.status, toStatus: status })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  return <div
    ref={drop as any}
    data-testid={status}
    className="p-4 border border-dashed border-gray-200 rounded-lg flex-1"
  >
    {loading ? <Overlay><div><ClipLoader /></div></Overlay> : null}
    {showAddTask ?
      <TaskModal
        callback={async () => { await refresh?.(); setShowAddTask(false); }}
        status={status}
        onClose={() => setShowAddTask(false)}
        task={typeof showAddTask === 'object' ? showAddTask : undefined}
      />
      : null}
    <div className="flex justify-between items-center my-2">
      <div className="font-medium text-base text-gray-400">
        {title}
      </div>
      <div
        className="cursor-pointer hover:underline hover:text-red-400"
        onClick={() => setShowAddTask(true)}
      >
        {t('common:add')}
      </div>
    </div>
    <div className="space-y-4 mt-4">
      {data?.todos?.map((item) => {
        return <Card
          onClick={() => setShowAddTask(item)}
          refresh={() => refresh?.([item.status])}
          key={item.id}
          data={item}
        />
      })}
    </div>
    {data?.hasNext ?
      <div
        className="mt-4 text-center cursor-pointer hover:underline text-red-400"
        onClick={() => handleLoadMore()}
      >
        Load more
      </div>
      : null}
  </div>
}