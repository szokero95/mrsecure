import { useDispatch, useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";
import { IFolder } from "../interfaces/folder";
import { RootState } from "../store";
import { setAllFolders } from "../reducers/folderReducer";

const useFolders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);

  const db = getDatabase();

  const createFolder = (folder: IFolder) => {
    const newFolderRef = ref(db, "/folders/" + user.uid + "/" + folder.id);

    set(newFolderRef, folder);
  };

  const listenFolder = () => {
    const folderRef = ref(db, "/folders/" + user.uid);
    onValue(folderRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data) {
        let dataArray = [];
        for (const key of Object.keys(data)) {
          dataArray.push(data[key] as IFolder);
        }
        dispatch(setAllFolders(dataArray));
      } else {
        dispatch(setAllFolders([]));
      }
    });
  };

  const updateFolder = (folderId: string, newState: IFolder) => {
    const newFolderRef = ref(db, "/folders/" + user.uid + "/" + folderId);
    update(newFolderRef, newState);
  };

  const deleteFolder = (folderId: string) => {
    const newFolderRef = ref(db, "/folders/" + user.uid + "/" + folderId);

    remove(newFolderRef);
  };

  return {
    createFolder,
    updateFolder,
    deleteFolder,
    listenFolder,
  };
};

export default useFolders;
