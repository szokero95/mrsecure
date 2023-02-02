import { useState } from "react";

import Button from "../../components/Button/Button";
import Drawer from "../../components/Drawer/Drawer";
import Input from "../../components/Input/Input";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotDrawer = ({ isOpen, setIsOpen }: IProps) => {
  const [email, setEmail] = useState<string>("");
  const auth = getAuth();

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsOpen(false);
      })
      .catch((error) => {});
  };
  return (
    <Drawer isOpen={isOpen} close={() => setIsOpen(false)}>
      <div className="flex justify-center align-center w-full h-screen ">
        <div className="flex flex-col gap-10 justify-center align-center w-80">
          <Input
            id="email"
            type="email"
            labelText="E-mail:"
            placeholder="name@example.com"
            value={email}
            setValue={setEmail}
          />
          <Button isFilled onClick={resetPassword}>
            Send reminder
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default ForgotDrawer;
