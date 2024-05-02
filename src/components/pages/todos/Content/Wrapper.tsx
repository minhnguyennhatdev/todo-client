import { ITodo, TodoStatus } from "@/services/todo"
import { Card } from "./Card"
import { useDrop } from "react-dnd"
import _ from "lodash"
import { httpRequest } from "@/utils/axios"

interface WrapperProps {
  title: string,
  data: ITodo[],
  type: string,
  refresh?: () => void
}

export const Wrapper = ({ title, data, type, refresh }: WrapperProps) => {
  const handleUpdateTodoStatus = _.debounce(async ({ id, status }: { id: number, status: string }) => {
    await httpRequest({
      method: "PUT",
      url: `/api/todos/${id}`,
      data: { status }
    })
    refresh?.()
  }, 500)

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: Object.values(TodoStatus).filter((status) => status !== type),
    drop: (item: ITodo, _monitor) => {
      console.log(item, type)
      handleUpdateTodoStatus({ id: item.id, status: type })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  return <div
    ref={drop as any}
    data-testid={type}
    className="p-4 border border-dashed border-gray-200 rounded-lg flex-1"
  >
    <div className="flex justify-between items-center my-2">
      <div className="font-medium text-base text-gray-400">
        {title}
      </div>
      <div className="cursor-pointer hover:underline hover:text-red-400">
        Add
      </div>
    </div>
    <div className="space-y-4 mt-4">
      {data?.map((item, index) => {
        return <Card key={index} data={item} />
      })}
    </div>
  </div>
}