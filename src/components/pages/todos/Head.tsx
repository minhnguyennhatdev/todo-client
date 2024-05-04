import { Button } from "@/components/commons/Button"
import { TaskModal } from "./Content/TaskModal"
import { useState } from "react"

export const Head = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  return (
    <div className="w-full pb-4 flex justify-between items-center border-b-[1px] border-b-gray-200">
      {showAddTask ? <TaskModal onClose={() => setShowAddTask(false)} /> : null}
      <div className="font-semibold">
        Board view
      </div>
      <div>
        <Button text="Add Task" onClick={() => setShowAddTask(true)} />
      </div>
    </div>
  )
}