"use client";

import { FormEvent, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";

import { formatStoredCep, useFreightCep } from "@/hooks/useFreight";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";

type CepModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CepModal({ isOpen, onClose }: CepModalProps) {
  const { cep, setCep } = useFreightCep();
  const [value, setValue] = useState(cep);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValue(cep);
      setError("");
    }
  }, [isOpen, cep]);

  const { dialogRef } = useModalAccessibility({
    isOpen,
    onClose,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!setCep(value)) {
      setError("Digite um CEP válido com 8 números.");
      return;
    }

    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cep-modal-title"
        tabIndex={-1}
        className="border-border bg-background w-full max-w-md rounded-[2rem] border p-6 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-full">
              <FaMapMarkerAlt size={16} aria-hidden="true" />
            </div>

            <div>
              <h2
                id="cep-modal-title"
                className="text-foreground font-serif text-2xl font-semibold"
              >
                Seu CEP
              </h2>

              <p className="text-muted mt-1 text-xs leading-5">
                O CEP salvo será usado para calcular o frete{" "}
                <span className="font-semibold">aproximado</span>{" "}
                automaticamente pela loja inteira. Se quiser, você pode alterá-lo a qualquer momento.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="border-border text-muted hover:bg-muted hover:text-foreground flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition"
          >
            <FaTimes size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <label
            htmlFor="global-cep"
            className="text-muted mb-2 block text-xs font-semibold tracking-[0.12em] uppercase"
          >
            CEP de destino
          </label>

          <div className="relative">
            <FaMapMarkerAlt
              size={13}
              className="text-muted pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
              aria-hidden="true"
            />

            <input
              id="global-cep"
              name="cep"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={9}
              autoFocus
              value={formatStoredCep(value)}
              onChange={(event) => {
                setValue(formatStoredCep(event.target.value));
                setError("");
              }}
              placeholder="00000-000"
              className="border-border bg-background text-foreground placeholder:text-muted/60 focus:border-primary focus:ring-primary/10 h-13 w-full rounded-full border pr-4 pl-10 text-sm outline-none focus:ring-2"
            />
          </div>

          {error && <p className="text-destructive mt-2 text-xs">{error}</p>}

          <button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary-hover mt-5 w-full cursor-pointer rounded-full px-5 py-3.5 text-sm font-semibold shadow-md transition hover:-translate-y-0.5"
          >
            Salvar CEP e calcular fretes
          </button>
        </form>
      </div>
    </div>
  );
}
