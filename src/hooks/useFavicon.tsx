import { useEffect, useState } from "react";

const useFavicon = (website: string) => {
  const [favicon, setFavicon] = useState<string>("");

  useEffect(() => {
    setFavicon(`https://www.google.com/s2/favicons?domain=${website}&sz=256`);
  }, [website]);

  return { favicon };
};

export default useFavicon;
