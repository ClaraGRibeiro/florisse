"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

type Confirmation =
  | { type: "remove"; itemId: string }
  | { type: "clear" };

type RemoveConfirmationModalProps = {
  confirmation: Confirmation | null;
  onClose: () => void;
  onConfirm: () => void;
};

export default function RemoveConfirmationModal({
  confirmation,
  onClose,
  onConfirm,
}: RemoveConfirmationModalProps) {
  useEffect(() => {
    if (!confirmation) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [confirmation, onClose]);

  if (!confirmation) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-sm rounded-[1.75rem] border border-border/80 bg-card p-7 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
          <FaTimes size={20} className="text-primary" />
        </div>

        <div className="mt-6 text-center">
          <h2 className="font-serif text-2xl font-semibold tracking-tight">
            Tem certeza disso?
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            {confirmation.type === "clear"
              ? "Todos os produtos serão removidos do seu carrinho."
              : "Este produto será removido do seu carrinho."}
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full border border-border bg-background px-4 py-3 text-sm font-medium transition-all duration-300 hover:border-primary hover:bg-primary/5"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
          >
            Sim, remover
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export type { Confirmation };
