"use client";

import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

type Confirmation = { type: "remove"; itemId: string } | { type: "clear" };

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
  const { dialogRef } = useModalAccessibility({
    isOpen: Boolean(confirmation),
    onClose,
  });

  if (!confirmation) return null;

  const titleId = "remove-confirmation-title";
  const descriptionId = "remove-confirmation-description";

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        initial={{
          opacity: 0,
          scale: 0.94,
          y: 10,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.94,
          y: 10,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="border-border/80 bg-card w-full max-w-sm rounded-[1.75rem] border p-7 shadow-2xl focus:outline-none"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="bg-primary/10 ring-primary/5 mx-auto flex h-16 w-16 items-center justify-center rounded-full ring-8">
          <FaTimes size={20} className="text-primary" aria-hidden="true" />
        </div>

        <div className="mt-6 text-center">
          <h2
            id={titleId}
            className="font-serif text-2xl font-semibold tracking-tight"
          >
            Tem certeza disso?
          </h2>

          <p id={descriptionId} className="text-muted mt-2 text-sm leading-6">
            {confirmation.type === "clear"
              ? "Todos os produtos serão removidos do seu carrinho."
              : "Este produto será removido do seu carrinho."}
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="border-border bg-background hover:border-primary hover:bg-primary/5 focus-visible:ring-primary cursor-pointer rounded-full border px-4 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-primary cursor-pointer rounded-full px-4 py-3 text-sm font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Sim, remover
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export type { Confirmation };
