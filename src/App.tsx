import { useEffect } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "./store";

import Login from "./pages/Login/";
import Home from "./pages/Home/";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebase";

export default function App() {
  const { user } = useSelector((state: RootState) => state);

  const app = initializeApp(firebaseConfig);

  useEffect(() => {}, []);

  return <>{user.uid === "" ? <Login /> : <Home />}</>;
}
