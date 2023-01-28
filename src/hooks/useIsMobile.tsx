import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth > 922) setIsMobile(false);
    else setIsMobile(true);
  }, []);

  return { isMobile };
};

export default useIsMobile;
