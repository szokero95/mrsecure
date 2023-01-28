import { useState } from "react";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import TextButton from "../../components/TextButton/TextButton";
import ErrorText from "../../components/ErrorText/ErrorText";
import LoginLogo from "./LoginLogo";
import ForgotPassword from "./ForgotPassword";

import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { emailLogin, emailRegister, googleLogin } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = () => {
    if (email === "") {
      setError("E-mail field is empty");
      return;
    }

    if (password === "") {
      setError("Password is empty");
      return;
    }
    emailLogin(email, password);
  };

  const handleSignUp = () => {
    //TEMPORARY FOR TEST
    if (email === "") {
      setError("E-mail field is empty");
      return;
    }

    if (password === "") {
      setError("Password is empty");
      return;
    }
    emailRegister(email, password);
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen text-gray-700 lg:flex-row-reverse dark:bg-neutral-800 dark:text-gray-300">
      <LoginLogo />
      <div className="flex flex-col gap-2 w-full px-10 lg:w-6/12">
        <Input
          id="email"
          type="email"
          labelText="E-mail:"
          placeholder="name@example.com"
          value={email}
          setValue={setEmail}
          isWrong={error === "EMPTY_EMAIL" || error === "WRONG_CREDENTIALS"}
        />
        <Input
          id="password"
          type="password"
          labelText="Password:"
          value={password}
          setValue={setPassword}
          isWrong={error === "EMPTY_PASSWORD" || error === "WRONG_CREDENTIALS"}
        />

        <ErrorText text={error} />

        <ForgotPassword />

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <Button isFilled onClick={handleLogin}>
            Sign in
          </Button>
          <Button onClick={handleGoogleLogin}>
            Sign in with <FcGoogle className="inline text-xl" />
          </Button>
        </div>

        <p className="text-center text-gray-500 mt-4">
          Don't have account?{" "}
          <TextButton onClick={handleSignUp}>Sign Up</TextButton>
        </p>
      </div>
    </div>
  );
};

export default Login;
