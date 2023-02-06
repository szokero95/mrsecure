import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { BsShieldLockFill } from "react-icons/bs";
import { AiFillEdit, AiFillFolder, AiFillStar } from "react-icons/ai";

import { SelectedContext } from "../../context/selected";
import useAuth from "../../hooks/useAuth";

import FolderListItem from "./FolderListItem";
import FolderDrawer from "../Drawers/FolderDrawer";

import Button from "../../components/Button/Button";
import Hr from "../../components/Hr/Hr";

const Menu = () => {
  const { folders } = useSelector((state: RootState) => state);
  const { selected, dispatchSelected } = useContext(SelectedContext);
  const { logOut } = useAuth();
  const [newFolderDrawer, setNewFolderDrawer] = useState<boolean>(false);
  const [editFolderDrawer, setEditFolderDrawer] = useState<boolean>(false);

  const handleSelect = (value: string) => {
    dispatchSelected({ type: "SELECT_FOLDER", payload: value });
  };

  const openNewFolderDrawer = () => {
    setNewFolderDrawer(true);
  };

  const openEditFolderDrawer = () => {
    setEditFolderDrawer(true);
  };

  return (
    <div className="flex flex-col items-center w-5/12 lg:w-2/12 bg-gray-300 h-screen pt-4 dark:bg-neutral-700 dark:text-gray-300">
      <ul className="h-4/5 w-full flex flex-col items-center justify-start overflow-auto">
        <FolderListItem
          key=""
          isSelected={selected.folder === ""}
          onClick={() => handleSelect("")}
        >
          <BsShieldLockFill className="inline mr-1" /> All Items
        </FolderListItem>
        <FolderListItem
          key="0"
          isSelected={selected.folder === "0"}
          onClick={() => handleSelect("0")}
        >
          <AiFillStar className="inline mr-1" /> Favorited
        </FolderListItem>
        <Hr />
        {folders.map((folder) => {
          return (
            <FolderListItem
              key={folder.id}
              isSelected={selected.folder === folder.id}
              onClick={() => handleSelect(folder.id)}
            >
              <AiFillFolder className="inline mr-1" /> {folder.name}{" "}
              <AiFillEdit
                className="ml-auto"
                onClick={() => openEditFolderDrawer()}
              />
            </FolderListItem>
          );
        })}
        <button
          className="border rounded w-18 p-2 mt-4 hover:bg-gray-200"
          onClick={() => openNewFolderDrawer()}
        >
          + Folder
        </button>
      </ul>

      <div className="h-1/5 w-20 flex flex-col items-center justify-center">
        <Button isFilled onClick={() => logOut()}>
          Log Out
        </Button>
      </div>
      <FolderDrawer
        isOpen={newFolderDrawer}
        setIsOpen={setNewFolderDrawer}
        id={undefined}
      />
      <FolderDrawer
        isOpen={editFolderDrawer}
        setIsOpen={setEditFolderDrawer}
        id={selected.folder}
      />
    </div>
  );
};

export default Menu;
