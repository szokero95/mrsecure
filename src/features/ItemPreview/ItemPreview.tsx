import { useContext, useEffect, useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import { SelectedContext } from "../../context/selected";

import useIsMobile from "../../hooks/useIsMobile";
import PreviewContent from "./PreviewContent";

const ItemPreview = () => {
  const { selected, dispatchSelected } = useContext(SelectedContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isMobile } = useIsMobile();

  useEffect(() => {
    if (selected.secret === "") setIsOpen(false);
    else setIsOpen(true);
  }, [selected.secret]);

  if (isMobile) {
    return (
      <Drawer
        isOpen={isOpen}
        close={() => dispatchSelected({ type: "SELECT_SECRET", payload: "" })}
      >
        <PreviewContent />
      </Drawer>
    );
  }
  return (
    <div className="w-6/12">
      {selected.secret === "" ? <></> : <PreviewContent />}
    </div>
  );
};

export default ItemPreview;
