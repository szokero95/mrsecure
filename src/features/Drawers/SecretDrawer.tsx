import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

import { RootState } from "../../store";

import { ISecret } from "../../interfaces/secret";

import useSecrets from "../../hooks/useSecrets";

import Drawer from "../../components/Drawer/Drawer";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import ErrorText from "../../components/ErrorText/ErrorText";

interface IProps {
  secretId?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SecretDrawer = ({ isOpen, setIsOpen, secretId }: IProps) => {
  const { secrets, folders } = useSelector((state: RootState) => state);
  const { updateSecret, createSecret } = useSecrets();
  const [error, setError] = useState<string>("");

  const [newWebsite, setNewWebsite] = useState<string>("");
  const [newDisplay, setNewDisplay] = useState<string>("");
  const [newUser, setNewUser] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newNotes, setNewNotes] = useState<string>("");
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>("");

  useEffect(() => {
    let secret: ISecret | undefined;
    if (secretId) secret = secrets.find((secret) => secret.id === secretId);
    if (secret) {
      setNewWebsite(secret.website);
      setNewDisplay(secret.displayName);
      setNewUser(secret.userName);
      setNewPassword(secret.password);
      setNewNotes(secret.notes);
      setIsFavorited(secret.isFavorited);
      setSelectedFolder(secret.folderId);
    }
  }, [secrets, secretId, isOpen]);

  const closeSecretDrawer = () => {
    setError("");
    setIsOpen(false);
  };

  const saveSecret = () => {
    if (newUser === "" || newPassword === "" || newDisplay === "") {
      setError("You must enter Username, Password and Website Display Name");
      return;
    }
    if (secretId) {
      const newSecret: ISecret = {
        id: secretId,
        website: newWebsite,
        displayName: newDisplay,
        userName: newUser,
        password: newPassword,
        notes: newNotes,
        folderId: selectedFolder !== "" ? selectedFolder : null,
        isFavorited: isFavorited,
      };
      updateSecret(secretId, newSecret);
    } else {
      const newSecret: ISecret = {
        id: v4(),
        website: newWebsite,
        displayName: newDisplay,
        userName: newUser,
        password: newPassword,
        notes: newNotes,
        folderId: selectedFolder !== "" ? selectedFolder : null,
        isFavorited: isFavorited,
      };
      createSecret(newSecret);
    }

    closeSecretDrawer();
  };

  return (
    <Drawer isOpen={isOpen} close={closeSecretDrawer}>
      <div className="flex flex-col mt-4 gap-2 ">
        <Input
          id={"website"}
          type="text"
          labelText="Website URL:"
          value={newWebsite}
          setValue={setNewWebsite}
        />
        <Input
          id={"display"}
          type="text"
          labelText="Website Display Name:"
          value={newDisplay}
          setValue={setNewDisplay}
        />
        <Input
          id={"user"}
          type="text"
          labelText="Username / E-mail:"
          value={newUser}
          setValue={setNewUser}
        />
        <Input
          id={"password"}
          type="password"
          labelText="Password:"
          value={newPassword}
          setValue={setNewPassword}
        />
        <div className="flex flex-col">
          <label htmlFor="select" className="font-semibold text-gray-400">
            Folder:
          </label>
          <select
            id="select"
            onChange={(e) => setSelectedFolder(e.currentTarget.value)}
            className={
              "p-2 m-0 bg-white dark:bg-neutral-800 border border-gray-400 text-gray-700 dark:text-gray-300 rounded-md"
            }
          >
            <option value="">-</option>
            {folders.map((folder) => {
              return (
                <option
                  value={folder.id}
                  selected={folder.id === selectedFolder}
                >
                  {folder.name}
                </option>
              );
            })}
          </select>
        </div>
        <Input
          id={"notes"}
          type="text"
          labelText="Notes:"
          value={newNotes}
          setValue={setNewNotes}
        />
        <ErrorText text={error} />
        <span className="h-3"></span>
        <Button isFilled onClick={saveSecret}>
          Save
        </Button>
      </div>
    </Drawer>
  );
};

export default SecretDrawer;
