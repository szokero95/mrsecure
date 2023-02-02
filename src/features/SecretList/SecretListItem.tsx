import { useContext } from "react";
import { ISecret } from "../../interfaces/secret";
import { AiFillStar } from "react-icons/ai";
import useFavicon from "../../hooks/useFavicon";
import { SelectedContext } from "../../context/selected";

interface IProps {
  secret: ISecret;
}

const SecretListItem = ({ secret }: IProps) => {
  const { selected, dispatchSelected } = useContext(SelectedContext);
  const { favicon } = useFavicon(secret.website);

  const selectSecret = () =>
    dispatchSelected({ type: "SELECT_SECRET", payload: secret.id });

  return (
    <div
      className={
        (selected.secret === secret.id
          ? "bg-blue-500 dark:bg-blue-700 text-white "
          : "dark:text-gray-300 ") +
        " flex flex-row p-2 lg:py-4 rounded gap-8 cursor-pointer transition-all duration-500 overflow-hidden "
      }
      onClick={selectSecret}
    >
      <img src={favicon} alt="favicon" className="w-8" />
      <div className="flex flex-col">
        <p>{secret.displayName}</p>
        <p
          className={
            (selected.secret === secret.id ? "text-white " : "text-gray-500 ") +
            "text-xs"
          }
        >
          {secret.userName}
        </p>
      </div>
      {secret.isFavorited ? (
        <AiFillStar
          className={
            (selected.secret === secret.id
              ? "text-yellow-300 "
              : "text-yellow-500 ") + "ml-auto "
          }
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SecretListItem;
