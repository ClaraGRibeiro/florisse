"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

import { useEffect } from "react";

type MiniCartProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeout = setTimeout(onClose, 800);

    return () => clearTimeout(timeout);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="border-border/80 bg-background fixed top-4 right-4 z-100 flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold shadow-lg sm:top-6 sm:right-6"
        >
          <span className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full">
            <FaCheck className="text-[10px]" />
          </span>

          <span>Adicionado</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
