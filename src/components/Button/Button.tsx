import React from "react";

interface IProps {
  isError?: boolean;
  isFilled?: boolean;
  isSmall?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({
  isError = false,
  isFilled = false,
  isSmall = false,
  onClick,
  children,
}: IProps) => {
  return (
    <button
      className={
        (isFilled
          ? "bg-blue-500 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          : isError
          ? "bg-red-500 hover:bg-red-700 text-white  dark:bg-red-700 dark:hover:bg-red-600 "
          : "border text-gray-700 border-gray-400 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-gray-300") +
        " flex justify-center items-center gap-2 font-medium p-2 rounded-md duration-1000" +
        (isSmall ? " w-12" : " w-full")
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
