import { BsShieldLockFill } from "react-icons/bs";

const LoginLogo = () => {
  return (
    <div
      className={
        "flex flex-col justify-center items-center " +
        " lg:w-6/12 lg:h-full lg:bg-gray-300 " +
        "lg:dark:bg-neutral-700 "
      }
    >
      <BsShieldLockFill className="text-blue-500 text-5xl mb-5 dark:text-blue-600" />{" "}
      <h1 className="text-3xl text-center mb-3">MrSecure</h1>
      <h2 className="text-lg text-center mb-10">
        Safest place for your passwords
      </h2>
    </div>
  );
};

export default LoginLogo;
