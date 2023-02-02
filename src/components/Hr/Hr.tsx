interface IProps {
  isFull?: boolean;
}

const Hr = ({ isFull }: IProps) => {
  return (
    <hr className={(isFull ? "w-full " : "w-9/12 m-2 ") + "border-gray-600 "} />
  );
};

export default Hr;
