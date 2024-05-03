import classNames from "classnames";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export const Button = ({ text, onClick, className }: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={classNames("bg-black text-white rounded-2xl font-normal text-sm px-6 py-2 cursor-pointer", className)}
    >
      {text}
    </div>
  )
}