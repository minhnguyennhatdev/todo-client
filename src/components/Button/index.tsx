
interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-black text-white rounded-2xl font-normal text-sm px-6 py-2 cursor-pointer"
    >
      {text}
    </div>
  )
}