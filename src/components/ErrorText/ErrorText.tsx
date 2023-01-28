interface IProps {
  text: string;
}
const ErrorText = ({ text }: IProps) => {
  if (text === "") return <></>;
  else return <p className={"text-red-400 text-sm mb-3"}>{text}</p>;
};

export default ErrorText;
