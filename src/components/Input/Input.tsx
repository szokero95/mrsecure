import React from "react";

interface IProps {
  id: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  labelText?: string;
  value: string;
  setValue: React.Dispatch<string>;
  isWrong?: boolean;
}

const Input = ({
  id,
  type,
  labelText,
  placeholder,
  value,
  isWrong,
  setValue,
}: IProps) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col ">
      <label htmlFor={id} className="text-sm font-semibold text-gray-400">
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={
          "p-2 border rounded-md text-gray-700 dark:bg-neutral-800 dark:text-gray-300 " +
          (isWrong ? "border-red-400 border-2" : "border-gray-400 ")
        }
        value={value}
        onChange={(e) => {
          changeHandler(e);
        }}
      />
    </div>
  );
};

export default Input;
