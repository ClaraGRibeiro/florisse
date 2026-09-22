"use client";

import { useEffect, useRef, type RefObject } from "react";

type UseModalAccessibilityOptions = {
  isOpen: boolean;
  onClose: () => void;
};

type UseModalAccessibilityReturn = {
  dialogRef: RefObject<HTMLDivElement | null>;
};

export function useModalAccessibility({
  isOpen,
  onClose,
}: UseModalAccessibilityOptions): UseModalAccessibilityReturn {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Bloqueia o scroll da página enquanto o modal está aberto
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const dialog = dialogRef.current;

    if (!dialog) {
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "details",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    const getFocusableElements = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true",
      );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];

      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      const focusableElements = getFocusableElements();

      focusableElements[0]?.focus();
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousOverflow;

      requestAnimationFrame(() => {
        previousFocusRef.current?.focus();
      });
    };
  }, [isOpen, onClose]);

  return {
    dialogRef,
  };
}
