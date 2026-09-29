"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Se houver uma âncora (#produtos, #cores etc.),
    // deixa o navegador cuidar do scroll até ela.
    if (window.location.hash) {
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}