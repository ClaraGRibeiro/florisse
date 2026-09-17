"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

type MiniCartProps = {
  isOpen: boolean;
  name: string;
  image: string;
  color: string;
  size: string;
  onClose: () => void;
};

export default function MiniCart({
  isOpen,
  name,
  image,
  color,
  size,
  onClose,
}: MiniCartProps) {
  /*
   * Fecha automaticamente após 2 segundos.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeout = setTimeout(() => {
      onClose();
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay somente no mobile */}

          <motion.div
            initial={{
              opacity: 0,
              y: -16,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="
              fixed
              right-4
              top-4
              z-100
              w-[calc(100%-2rem)]
              max-w-sm
              rounded-3xl
              border
              border-border/80
              bg-background
              p-4
              shadow-2xl
              sm:right-6
              sm:top-6
            "
            role="dialog"
            aria-label="Produto adicionado ao carrinho"
          >
            {/* CABEÇALHO */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FaCheck size={11} />
                </span>

                <p className="text-sm font-semibold">
                  Adicionado ao carrinho
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted transition hover:bg-muted hover:text-foreground"
              >
                <FaTimes size={12} />
              </button>
            </div>

            {/* PRODUTO */}
            <div className="mt-4 flex gap-3 rounded-2xl border border-muted/40 p-3">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 py-1">
                <h3 className="truncate font-serif text-base font-semibold">
                  {name}
                </h3>

                <p className="mt-1 text-xs text-muted">
                  {size} · {color}
                </p>
              </div>
            </div>

            {/* AÇÃO */}
            <Link
              href="/carrinho"
              onClick={onClose}
              className="
                mt-4
                flex
                items-center
                justify-center
                rounded-full
                bg-primary
                px-4
                py-3
                text-sm
                font-semibold
                text-primary-foreground
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-primary-hover
              "
            >
              Ver carrinho
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
