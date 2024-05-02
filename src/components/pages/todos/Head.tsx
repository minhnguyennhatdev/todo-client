import { Button } from "@/components/Button"

export const Head = () => {
  return (
    <div className="w-full pb-4 flex justify-between items-center border-b-[1px] border-b-gray-200">
      <div className="font-semibold">
        Board view
      </div>
      <div>
        <Button text="Add Task" onClick={() => { }} />
      </div>
    </div>
  )
}