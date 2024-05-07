import { Button } from "@/components/commons/Button"
import { TaskModal } from "./Content/TaskModal"
import { useState } from "react"
import { useTranslation } from "next-i18next"

export const Head = () => {
  const { t } = useTranslation()
  const [showAddTask, setShowAddTask] = useState(false)
  return (
    <div className="w-full pb-4 flex justify-between items-center border-b-[1px] border-b-gray-200">
      {showAddTask ? <TaskModal onClose={() => setShowAddTask(false)} /> : null}
      <div className="font-semibold">
        {t('common:board_view')}
      </div>
      {/* <div>
        <Button text={t('common:add_task')} onClick={() => setShowAddTask(true)} />
      </div> */}
    </div>
  )
}