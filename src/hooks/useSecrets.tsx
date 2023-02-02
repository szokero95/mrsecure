import { useDispatch, useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";
import { ISecret } from "../interfaces/secret";
import { RootState } from "../store";
import { setAllSecrets } from "../reducers/secretReducer";

const useSecrets = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);

  const db = getDatabase();

  const createSecret = (secret: ISecret) => {
    const secretRef = ref(db, "/secrets/" + user.uid + "/" + secret.id);

    set(secretRef, secret);
  };

  const listenSecret = () => {
    const secretRef = ref(db, "/secrets/" + user.uid);
    const unsub = onValue(secretRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data) {
        let dataArray = [];
        for (const key of Object.keys(data)) {
          dataArray.push(data[key] as ISecret);
        }
        dispatch(setAllSecrets(dataArray));
      } else {
        dispatch(setAllSecrets([]));
      }
    });
    return unsub;
  };

  const updateSecret = (secretId: string, newState: ISecret) => {
    const secretRef = ref(db, "/secrets/" + user.uid + "/" + secretId);
    update(secretRef, newState);
  };

  const deleteSecret = (secretId: string) => {
    const secretRef = ref(db, "/secrets/" + user.uid + "/" + secretId);

    remove(secretRef);
  };

  return {
    createSecret,
    updateSecret,
    deleteSecret,
    listenSecret,
  };
};

export default useSecrets;
