import Button from "../../components/Button/Button";
import { AiFillEdit, AiFillDelete, AiFillStar } from "react-icons/ai";
import { useContext, useState } from "react";
import useFavicon from "../../hooks/useFavicon";
import Hr from "../../components/Hr/Hr";
import PreviewInput from "./PreviewInput";
import SecretDrawer from "../Drawers/SecretDrawer";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { SelectedContext } from "../../context/selected";
import useSecrets from "../../hooks/useSecrets";

const PreviewContent = () => {
  const { secrets } = useSelector((state: RootState) => state);

  const { updateSecret, deleteSecret } = useSecrets();
  const { selected, dispatchSelected } = useContext(SelectedContext);
  const [secretDrawerOpen, setSecretDrawerOpen] = useState<boolean>(false);
  const secret = secrets.find((secret) => secret.id === selected.secret);
  const { favicon } = useFavicon(secret?.website || "");

  const handleEdit = () => {
    setSecretDrawerOpen(true);
  };

  const changeFavorited = () => {
    if (secret)
      updateSecret(secret.id, { ...secret, isFavorited: !secret.isFavorited });
  };

  const handleDelete = () => {
    deleteSecret(selected.secret);
    dispatchSelected({ type: "SELECT_SECRET", payload: "" });
  };

  const confirmDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="flex flex-col gap-6 w-48 justify-center">
            <h1 className="w-full text-center text-2xl">Are you sure?</h1>

            <div className="flex flex-row gap-2">
              <Button
                isError
                onClick={() => {
                  handleDelete();
                  onClose();
                }}
              >
                Yes
              </Button>
              <Button onClick={onClose}>No</Button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full px-12 lg:py-4">
      <div className="flex flex-row w-6/12 gap-2 ">
        <Button isFilled onClick={handleEdit}>
          <AiFillEdit className="inline" /> Edit
        </Button>
        <Button isError onClick={confirmDelete}>
          <AiFillDelete className="inline" /> Delete
        </Button>
      </div>
      <div className="flex flex-row items-center ">
        <img src={favicon} alt="favicon" className="w-12" />

        <p className="ml-2 text-3xl dark:text-gray-300 ">
          {secret?.displayName}
        </p>
        <AiFillStar
          className={
            (secret?.isFavorited
              ? "text-yellow-500 "
              : "text-gray-700 dark:text-gray-300 ") +
            "ml-auto text-2xl cursor-pointer"
          }
          onClick={changeFavorited}
        />
      </div>
      <Hr isFull />
      {secret && (
        <div className="flex flex-col gap-4">
          <PreviewInput
            id="username"
            type="text"
            value={secret.userName}
            labelText="Username:"
            buttonType="copy"
          />
          <PreviewInput
            id="password"
            type="password"
            value={secret.password}
            labelText="Password:"
            buttonType="copy"
          />
          <PreviewInput
            id="website"
            type="text"
            value={secret.website}
            labelText="Website:"
            buttonType="link"
          />
        </div>
      )}
      <Hr isFull />
      <div>
        <p className="text-gray-700 dark:text-gray-300 ">Notes: </p>
        <p className="text-gray-700 dark:text-gray-300 ">{secret?.notes}</p>
      </div>
      <SecretDrawer
        isOpen={secretDrawerOpen}
        setIsOpen={setSecretDrawerOpen}
        secretId={secret?.id}
      />
    </div>
  );
};
export default PreviewContent;
