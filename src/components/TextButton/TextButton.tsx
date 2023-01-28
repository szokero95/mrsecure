interface IProps {
  onClick: () => void;
  children: React.ReactNode;
}

const TextButton = ({ onClick, children }: IProps) => {
  return (
    <button className="text-blue-500" onClick={onClick}>
      {children}
    </button>
  );
};

export default TextButton;
