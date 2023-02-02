import { useEffect, useReducer } from "react";

import {
  selectedReducer,
  SelectedContext,
  initialState,
} from "../../context/selected";

import SecretList from "../../features/SecretList/SecretList";
import Menu from "../../features/Menu/Menu";
import ItemPreview from "../../features/ItemPreview/ItemPreview";
import useFolders from "../../hooks/useFolders";
import useSecrets from "../../hooks/useSecrets";

const Home = () => {
  const { listenFolder } = useFolders();
  const { listenSecret } = useSecrets();
  const [selected, dispatchSelected] = useReducer(
    selectedReducer,
    initialState
  );

  useEffect(() => {
    listenFolder();
    const unSubSecret = listenSecret();
    return () => {
      unSubSecret();
    };
  }, []);

  return (
    <SelectedContext.Provider value={{ selected, dispatchSelected }}>
      <div className="flex flex-row dark:bg-neutral-800 dark:text-gray-300">
        <Menu />
        <SecretList />
        <ItemPreview />
      </div>
    </SelectedContext.Provider>
  );
};

export default Home;
