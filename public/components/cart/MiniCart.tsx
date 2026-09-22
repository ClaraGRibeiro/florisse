"use client";

import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import ImageWithFallback from "../ui/ImageWithFallback";

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
  const { dialogRef } = useModalAccessibility({
    isOpen,
    onClose,
  });

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
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mini-cart-title"
            aria-describedby="mini-cart-description"
            tabIndex={-1}
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
            className="border-border/80 bg-background fixed top-4 right-4 z-100 w-[calc(100%-2rem)] max-w-sm rounded-3xl border p-4 shadow-2xl focus:outline-none sm:top-6 sm:right-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-full">
                  <FaCheck size={11} />
                </span>

                <p id="mini-cart-title" className="text-sm font-semibold">
                  Adicionado ao carrinho
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="text-muted hover:bg-muted hover:text-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition"
              >
                <FaTimes size={12} />
              </button>
            </div>

            <div
              id="mini-cart-description"
              className="border-muted/40 mt-4 flex gap-3 rounded-2xl border p-3"
            >
              <div className="bg-muted relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <ImageWithFallback
                  src={image}
                  alt={name}
                  fill
                  sizes="80px"
                  fallbackMessage="Não foi possível carregar a imagem"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 py-1">
                <h3 className="truncate font-serif text-base font-semibold">
                  {name}
                </h3>

                <p className="text-muted mt-1 text-xs">
                  {size} · {color}
                </p>
              </div>
            </div>

            <Link
              href="/carrinho"
              onClick={onClose}
              className="bg-primary text-primary-foreground hover:bg-primary-hover mt-4 flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              Ver carrinho
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
