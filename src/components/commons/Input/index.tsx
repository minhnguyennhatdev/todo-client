import classNames from "classnames"

interface InputProps {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  className?: string
}

export const Input = ({ value, onChange, placeholder, className }: InputProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={classNames("border-red-200 border rounded-md p-2", className)}
    />
  )
}