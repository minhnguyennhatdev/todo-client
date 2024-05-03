import classNames from "classnames"

interface SelectProps {
    options: { value: string, label: string }[],
    value?: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    className?: string
}

export const Select = ({ options, value, onChange, className, ...props }: SelectProps) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className={classNames("border-red-200 border rounded-md p-2", className)}
            {...props}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    )
}