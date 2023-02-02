import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { v4 } from "uuid";
import DrawerCloseButton from "./DrawerCloseButton";
import GrayBg from "./GrayBg";
import useIsMobile from "../../hooks/useIsMobile";

interface IProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

const Drawer = ({ isOpen, close, children }: IProps) => {
  const { isMobile } = useIsMobile();

  return (
    <div id="drawer">
      <AnimatePresence>
        {isOpen && (
          <>
            <GrayBg onClick={close} />
            <motion.div
              animate={isMobile ? { left: 0 } : { left: "75%" }}
              initial={{ left: "100%" }}
              exit={{ left: "100%" }}
              transition={{ duration: 1 }}
              key="Drawer"
              className={
                (isMobile ? "w-full " : "w-3/12 ") +
                "absolute block  overflow-hidden bg-white top-0 h-screen p-4 z-50 border-l-2 dark:bg-neutral-800 dark:border-neutral-700"
              }
            >
              <DrawerCloseButton onClick={close} />
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Drawer;
