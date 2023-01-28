import { useState } from "react";

import Button from "../../components/Button/Button";
import Drawer from "../../components/Drawer/Drawer";
import Input from "../../components/Input/Input";
import TextButton from "../../components/TextButton/TextButton";

const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const openPasswordResetDrawer = () => {
    setIsOpen(true);
  };

  const closePasswordResetDrawer = () => {
    setEmail("");
    setIsOpen(false);
  };

  return (
    <div className="flex w-full justify-end">
      <TextButton onClick={openPasswordResetDrawer}>
        Forgot password?
      </TextButton>
      <Drawer isOpen={isOpen} close={closePasswordResetDrawer}>
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
            <Button isFilled onClick={closePasswordResetDrawer}>
              Send reminder
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ForgotPassword;
