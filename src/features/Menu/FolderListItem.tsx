interface IProps {
  isSelected: boolean;
  key: string;
  onClick: () => void;
  children: React.ReactNode;
}
const FolderListItem = ({ isSelected, key, onClick, children }: IProps) => {
  return (
    <li
      className={
        (isSelected ? "bg-blue-500 text-white dark:bg-blue-700 " : " ") +
        "py-2 mt-2 lg:py-1 px-2 w-10/12 rounded transition-all duration-500 flex items-center cursor-pointer "
      }
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default FolderListItem;
