import { AiOutlineCopy, AiOutlineArrowRight } from "react-icons/ai";

interface IProps {
  id: string;
  labelText: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  buttonType: "copy" | "link";
}

const PreviewInput = ({ id, labelText, type, value, buttonType }: IProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  const handleOpen = () => {
    let url: string;
    if (!value.startsWith("http")) url = "https:\\\\" + value;
    else url = value;
    window.open(url);
  };

  return (
    <div className="flex flex-row w-full items-center p-2 border rounded-md">
      <div className="flex flex-col w-full">
        <label htmlFor={id} className="font-semibold text-gray-400">
          {labelText}
        </label>

        <input
          id={id}
          className="w-full focus:outline-none text-gray-700 dark:text-gray-300 dark:bg-neutral-800  "
          value={value}
          type={type}
          readOnly
        />
      </div>
      {buttonType === "copy" ? (
        <button
          className="-m-8 text-2xl dark:text-gray-300"
          onClick={handleCopy}
        >
          <AiOutlineCopy />
        </button>
      ) : (
        <button
          className="-m-8 text-2xl dark:text-gray-300"
          onClick={handleOpen}
        >
          <AiOutlineArrowRight />
        </button>
      )}
    </div>
  );
};

export default PreviewInput;
