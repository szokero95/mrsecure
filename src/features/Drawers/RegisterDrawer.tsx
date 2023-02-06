import { useState } from "react";

import useAuth from "../../hooks/useAuth";

import Button from "../../components/Button/Button";
import Drawer from "../../components/Drawer/Drawer";
import ErrorText from "../../components/ErrorText/ErrorText";
import Input from "../../components/Input/Input";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterDrawer = ({ isOpen, setIsOpen }: IProps) => {
  const { emailRegister } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

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

  return (
    <Drawer isOpen={isOpen} close={() => setIsOpen(false)}>
      <div className="flex justify-center align-center w-full h-screen ">
        <div className="flex flex-col gap-4 justify-center align-center w-80">
          <Input
            id="email"
            type="email"
            labelText="E-mail:"
            placeholder="name@example.com"
            value={email}
            setValue={setEmail}
          />

          <Input
            id="password"
            type="password"
            labelText="Password:"
            value={password}
            setValue={setPassword}
          />
          <Button isFilled onClick={handleSignUp}>
            Register
          </Button>
        </div>

        <ErrorText text={error} />
      </div>
    </Drawer>
  );
};

export default RegisterDrawer;
