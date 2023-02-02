import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { ISecret } from "../../interfaces/secret";
import SecretListItem from "./SecretListItem";
import SecretDrawer from "../Drawers/SecretDrawer";
import { AiOutlinePlus } from "react-icons/ai";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SelectedContext } from "../../context/selected";

const SecretList = () => {
  const { selected } = useContext(SelectedContext);
  const { secrets } = useSelector((state: RootState) => state);
  const [filteredSecrets, setFilteredSecrets] = useState<ISecret[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [secretDrawerOpen, setSecretDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    let currentSecrets: ISecret[] = [];
    if (selected.folder === "") currentSecrets = secrets;
    else if (selected.folder === "0")
      currentSecrets = secrets.filter((secret) => secret.isFavorited);
    else
      currentSecrets = secrets.filter(
        (secret) => secret.folderId === selected.folder
      );

    setFilteredSecrets(
      currentSecrets.filter((secret) => {
        return (
          secret.userName.includes(searchText) ||
          secret.website.includes(searchText) ||
          secret.notes.includes(searchText)
        );
      })
    );
  }, [secrets, selected.folder, searchText]);

  return (
    <div className="w-7/12 lg:w-4/12 p-4 flex flex-col gap-4 dark:bg-neutral-800 border-r-2 dark:border-black">
      <div className="w-full flex flex-row gap-2 ">
        <div className="w-8/12 lg:w-10/12 ">
          <Input
            id="search"
            type="text"
            value={searchText}
            setValue={setSearchText}
            placeholder="Search..."
          />
        </div>
        <div className="flex w-4/12 lg:w-2/12 ">
          <Button isFilled isSmall onClick={() => setSecretDrawerOpen(true)}>
            <AiOutlinePlus className="m-auto" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 owerflow-auto ">
        {filteredSecrets.map((secret) => {
          return <SecretListItem secret={secret} />;
        })}
      </div>
      <SecretDrawer isOpen={secretDrawerOpen} setIsOpen={setSecretDrawerOpen} />
    </div>
  );
};

export default SecretList;
