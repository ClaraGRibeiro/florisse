"use client";

import { FaArrowUp, FaWhatsapp } from "react-icons/fa";

import { WHATSAPP } from "@/data/config";
import { useScrollTop } from "@/hooks/useScrollTop";

export default function FloatingActions() {
  const { showTop, scrollToTop } = useScrollTop();

  if (!showTop) {
    return null;
  }

  return (
    <>
      <button
        title="Voltar para o início"
        aria-label="Voltar para o início"
        onClick={scrollToTop}
        className="bg-primary fixed right-6 bottom-6 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 md:flex"
      >
        <FaArrowUp size={18} />
      </button>

      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        title="Contatar pelo WhatsApp"
        aria-label="Contatar pelo WhatsApp"
        className="bg-primary focus-visible:ring-primary fixed bottom-6 left-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <FaWhatsapp size={18} />
      </a>
    </>
  );
}