import { Context, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { RootState } from "../../store";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import ErrorText from "../../components/ErrorText/ErrorText";
import Drawer from "../../components/Drawer/Drawer";
import useFolders from "../../hooks/useFolders";
import useSecrets from "../../hooks/useSecrets";
import { SelectedContext } from "../../context/selected";

interface IProps {
  id: string | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FolderDrawer = ({ id, isOpen, setIsOpen }: IProps) => {
  const { folders, secrets } = useSelector((state: RootState) => state);
  const { dispatchSelected } = useContext(SelectedContext);
  const { createFolder, updateFolder, deleteFolder } = useFolders();
  const { updateSecret } = useSecrets();

  const [currentFolderName, setCurrentFolderName] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const selectedFolder = folders.find((folder) => folder.id === id);
    if (selectedFolder) {
      setCurrentFolderName(selectedFolder.name);
    }
  }, [id, isOpen, folders]);

  const closeEditFolderDrawer = () => {
    setError("");
    setCurrentFolderName("");
    setIsOpen(false);
  };

  const handleSave = () => {
    if (currentFolderName === "") setError("Folder name can't be empty");
    else {
      if (id) {
        const newFolder = { id: id, name: currentFolderName };
        updateFolder(id, newFolder);
      } else {
        const newFolder = { id: v4(), name: currentFolderName };
        console.log(newFolder);
        createFolder(newFolder);
      }
      closeEditFolderDrawer();
    }
  };

  const handleDelete = () => {
    if (id) {
      deleteFolder(id);
      secrets.forEach((secret) => {
        if (secret.folderId === id)
          updateSecret(secret.id, { ...secret, folderId: null });
      });
      dispatchSelected({ type: "SELECT_FOLDER", payload: "" });
    }
    closeEditFolderDrawer();
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
    <Drawer isOpen={isOpen} close={closeEditFolderDrawer}>
      <div className="mt-14 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Input
            id={"folderName"}
            type={"text"}
            value={currentFolderName}
            setValue={setCurrentFolderName}
            labelText="Folder name:"
          />
          <ErrorText text={error} />
        </div>
        <div className="flex flex-col gap-2">
          <Button isFilled onClick={handleSave}>
            Save
          </Button>
          {id && (
            <Button isError onClick={confirmDelete}>
              Delete
            </Button>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default FolderDrawer;
