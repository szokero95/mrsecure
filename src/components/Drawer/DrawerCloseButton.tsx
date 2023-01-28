interface IProps {
  onClick: () => void;
}

const DrawerCloseButton = ({ onClick }: IProps) => {
  return (
    <button
      className="absolute text-2xl w-10 h-10 top-4 right-4 flex justify-center align-center text-gray-400 hover:scale-125 transition-all duration-300"
      onClick={onClick}
    >
      x
    </button>
  );
};

export default DrawerCloseButton;
