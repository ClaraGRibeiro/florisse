"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaCheck,
  FaCopy,
  FaWhatsapp,
} from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";

import { Product } from "@/types/product";

type ShareProps = {
  product: Product;
};

export default function Share({
  product,
}: ShareProps) {
  const [shareMenuOpen, setShareMenuOpen] =
    useState(false);

  const [linkCopied, setLinkCopied] =
    useState(false);

  const copiedTimeout =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  useEffect(() => {
    if (!shareMenuOpen) {
      return;
    }

    const handleClickOutside = () => {
      setShareMenuOpen(false);
    };

    document.addEventListener(
      "click",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside,
      );
    };
  }, [shareMenuOpen]);

  useEffect(() => {
    return () => {
      if (copiedTimeout.current) {
        clearTimeout(
          copiedTimeout.current,
        );
      }
    };
  }, []);

  const url =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  const shareText =
    "Olha essa peça linda da Florisse! 🧶✨";

  const compartilharProduto =
    async () => {
      if (!url) {
        return;
      }

      try {
        if (navigator.share) {
          await navigator.share({
            title: product.name,
            text: shareText,
            url,
          });

          setShareMenuOpen(false);
          return;
        }

        compartilharWhatsApp();
      } catch {
        // Usuário fechou o compartilhamento.
      }
    };

  const compartilharWhatsApp = () => {
    if (!url) {
      return;
    }

    const message =
      `${shareText}\n\n${product.name}\n${url}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        message,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );

    setShareMenuOpen(false);
  };

  const copiarLink = async () => {
    if (!url) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        url,
      );

      setLinkCopied(true);

      if (copiedTimeout.current) {
        clearTimeout(
          copiedTimeout.current,
        );
      }

      copiedTimeout.current =
        setTimeout(() => {
          setLinkCopied(false);
          copiedTimeout.current = null;
        }, 1800);
    } catch {
      setLinkCopied(false);
    }
  };

  return (
    <div
      className="relative"
      onClick={(event) =>
        event.stopPropagation()
      }
    >
      <button
        type="button"
        onClick={() =>
          setShareMenuOpen(
            (previous) => !previous,
          )
        }
        className={`group flex cursor-pointer items-center gap-2 rounded-full border bg-card px-4 py-2.5 text-sm font-medium shadow-sm transition-all duration-300 ${
          shareMenuOpen
            ? "border-primary/40 text-primary shadow-md"
            : "border-border text-foreground hover:border-primary/40 hover:text-primary hover:shadow-md"
        }`}
      >
        <FaShareFromSquare
          className={`text-sm transition-transform duration-300 ${
            shareMenuOpen
              ? "scale-110"
              : "group-hover:scale-110"
          }`}
        />

        <span>
          Compartilhar peça
        </span>
      </button>

      {shareMenuOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl">
          <div className="px-3 pb-2 pt-2">
            <p className="font-serif text-base font-semibold text-foreground">
              Compartilhar peça
            </p>

            <p className="mt-0.5 text-xs text-muted">
              Espalhe esse cantinho da Florisse ✨
            </p>
          </div>

          <button
            type="button"
            onClick={
              compartilharWhatsApp
            }
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-foreground transition-colors hover:bg-muted/10 hover:text-primary"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FaWhatsapp />
            </span>

            <span>
              <span className="block font-medium">
                WhatsApp
              </span>

              <span className="block text-xs text-muted">
                Mandar para alguém
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={copiarLink}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-foreground transition-colors hover:bg-muted/10 hover:text-primary"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              {linkCopied ? (
                <FaCheck />
              ) : (
                <FaCopy />
              )}
            </span>

            <span>
              <span className="block font-medium">
                {linkCopied
                  ? "Link copiado!"
                  : "Copiar link"}
              </span>

              <span className="block text-xs text-muted">
                {linkCopied
                  ? "Agora é só enviar ✨"
                  : "Copiar o endereço da peça"}
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={
              compartilharProduto
            }
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-foreground transition-colors hover:bg-muted/10 hover:text-primary"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FaShareFromSquare />
            </span>

            <span>
              <span className="block font-medium">
                Compartilhar
              </span>

              <span className="block text-xs text-muted">
                Mais opções
              </span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}