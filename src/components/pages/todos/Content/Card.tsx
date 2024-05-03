import { deleteTodo, ITodo } from "@/services/todo"
import { formatDate } from "@/utils/format"
import { useDrag } from "react-dnd"

export const Card = ({ data, refresh }: { data: ITodo, refresh: () => void }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: data.status,
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  return (
    <div
      ref={drag as any}
      className="cursor-pointer border border-gray-200 rounded-xl flex-1 p-4 hover:shadow-lg"
    >
      <div className="text-lg font-semibold flex justify-between items-center w-full">
        <div>
          {data.title}
        </div>
        <div
          className="font-light text-red-600 hover:text-red-900 cursor-pointer"
          onClick={async () => { await deleteTodo(data.id); refresh?.() }}
        >
          x
        </div>
      </div>
      <div className="text-base text-gray-500">
        {data.description}
      </div>
      <div className="mt-6 text-base text-center bg-red-200 rounded-lg text-red-400">
        {formatDate(data.createdAt, "DD/MM/YYYY hh:mm")}
      </div>
    </div>
  )
}