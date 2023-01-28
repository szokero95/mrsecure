import { setUser, resetUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  //Setting the current User in Store
  const manageUser = (user: User) => {
    dispatch(
      setUser({
        displayName: user.displayName ? user.displayName : "",
        uid: user.uid,
        email: user.email ? user.email : "",
        photoURL: user.photoURL ? user.photoURL : "",
      })
    );
    user.getIdToken().then((token) => localStorage.setItem("token", token));
  };

  const emailLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        manageUser(user);
      })
      .catch((error) => {});
  };

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (credential) {
          const user = result.user;
          manageUser(user);
        }
      })
      .catch((error) => {});
  };

  const emailRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        manageUser(user);
      })
      .catch((error) => {});
  };

  const logOut = () =>
    signOut(auth)
      .then(() => {
        dispatch(resetUser());
      })
      .catch((error) => {});

  return { emailLogin, emailRegister, googleLogin, logOut };
};

export default useAuth;
