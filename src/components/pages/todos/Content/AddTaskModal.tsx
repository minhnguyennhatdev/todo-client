import { Button } from "@/components/commons/Button"
import { Input } from "@/components/commons/Input"
import { Overlay } from "@/components/commons/Overlay"
import { Select } from "@/components/commons/Select"
import { AddTodo, addTodo, ITodo, TodoStatus } from "@/services/todo"
import { HttpStatusCode } from "axios"
import { useCallback, useState } from "react"

interface AddTaskModalProps {
  onClose: () => void
  status?: TodoStatus,
  callback?: () => any
}

const Status = {
  [TodoStatus.TODO]: "Todo",
  [TodoStatus.IN_PROGRESS]: "In Progress",
  [TodoStatus.DONE]: "Done"
}

export const AddTaskModal = ({ onClose, status, callback }: AddTaskModalProps) => {
  const [value, set] = useState<AddTodo>({
    status: status ?? TodoStatus.TODO,
    title: "",
    description: ""
  })

  const setValue = (value: any) => set((prev) => ({ ...prev, ...value }))

  const handleAddTask = useCallback(async (value: AddTodo) => {
    const { status } = await addTodo({
      ...value,
      status: value.status || TodoStatus.TODO
    })
    console.log(status)
    if (status === HttpStatusCode.Ok) {
      callback?.()
    }
  }, [callback])

  return (
    <Overlay outSideClick={onClose}>
      <div className="w-[400px] bg-white rounded-lg p-4">
        <div
          className="flex justify-end"
          onClick={onClose}
        >
          <div className="cursor-pointer hover:text-red-300 text-2xl">x</div>
        </div>
        <div className="flex justify-center flex-col items-center py-4 space-y-4">
          <div className="w-full">
            Status
          </div>
          <Select
            onChange={(e) => setValue({ status: e.target.value })}
            value={value.status}
            options={Object.entries(Status).map(([value, label]) => ({ value, label }))}
            className="w-full"
          />

          <div className="w-full">
            Content
          </div>
          <Input
            onChange={(e) => setValue({ title: e.target.value })}
            value={value.title}
            placeholder="Title"
            className="w-full"
          />
          <Input
            onChange={(e) => setValue({ description: e.target.value })}
            value={value.description}
            placeholder="Description"
            className="w-full"
          />
          <div></div>
          <Button
            className="w-full rounded-md bg-red-400 text-center text-black"
            onClick={() => handleAddTask(value)}
            text="Add" />
        </div>
      </div>
    </Overlay>

  )
}