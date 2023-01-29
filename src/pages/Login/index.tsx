import { useState } from "react";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import TextButton from "../../components/TextButton/TextButton";
import ErrorText from "../../components/ErrorText/ErrorText";
import LoginLogo from "./LoginLogo";
import ForgotDrawer from "./ForgotDrawer";

import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import RegisterDrawer from "./RegisterDrawer";

const Login = () => {
  const { emailLogin, googleLogin } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [forgotDrawerOpen, setForgotDrawerOpen] = useState<boolean>(false);
  const [registerDrawerOpen, setRegisterDrawerOpen] = useState<boolean>(false);

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

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen text-gray-700 lg:flex-row-reverse dark:bg-neutral-800 dark:text-gray-300">
      <LoginLogo />
      <div className="flex flex-col items-center w-full px-10 lg:w-6/12">
        <div className="max-w-md flex flex-col gap-2 ">
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
            isWrong={
              error === "EMPTY_PASSWORD" || error === "WRONG_CREDENTIALS"
            }
          />

          <ErrorText text={error} />

          <div className="flex w-full justify-end">
            <TextButton onClick={() => setForgotDrawerOpen(true)}>
              Forgot password?
            </TextButton>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <Button isFilled onClick={handleLogin}>
              Sign in
            </Button>
            <Button onClick={googleLogin}>
              Sign in with <FcGoogle className="inline text-xl" />
            </Button>
          </div>

          <p className="text-center text-gray-500 mt-4">
            Don't have account?{" "}
            <TextButton onClick={() => setRegisterDrawerOpen(true)}>
              Sign Up
            </TextButton>
          </p>
        </div>
      </div>
      <ForgotDrawer isOpen={forgotDrawerOpen} setIsOpen={setForgotDrawerOpen} />
      <RegisterDrawer
        isOpen={registerDrawerOpen}
        setIsOpen={setRegisterDrawerOpen}
      />
    </div>
  );
};

export default Login;
