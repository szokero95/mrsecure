interface IProps {
  onClick: () => void;
}

const GrayBg = ({ onClick }: IProps) => {
  return (
    <div
      className={
        "absolute block overflow-hidden opacity-50 bg-gray-500 left-0 top-0 h-screen w-screen cursor-default"
      }
      onClick={onClick}
    ></div>
  );
};

export default GrayBg;
