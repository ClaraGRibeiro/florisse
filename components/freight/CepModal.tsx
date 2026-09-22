"use client";

import { FormEvent, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaTimes, FaInfoCircle } from "react-icons/fa";

import { formatStoredCep, useFreightCep } from "@/hooks/useFreight";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";

type CepModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ViaCepResponse = {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
};

export default function CepModal({ isOpen, onClose }: CepModalProps) {
  const { cep, setCep } = useFreightCep();

  const [value, setValue] = useState(cep);
  const [error, setError] = useState("");
  const [address, setAddress] = useState<ViaCepResponse | null>(null);
  const [loadingAddress, setLoadingAddress] = useState(false);

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

  async function searchAddress(cepValue: string) {
    const cleanedCep = cepValue.replace(/\D/g, "");

    if (cleanedCep.length !== 8) {
      setAddress(null);
      return;
    }

    setLoadingAddress(true);
    setAddress(null);

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanedCep}/json/`,
      );

      if (!response.ok) {
        setAddress(null);
        return;
      }

      const data = (await response.json()) as ViaCepResponse;

      if (data.erro) {
        setAddress(null);
        return;
      }

      setAddress(data);
    } catch {
      setAddress(null);
    } finally {
      setLoadingAddress(false);
    }
  }

  function handleCepChange(value: string) {
    const formatted = formatStoredCep(value);

    setValue(formatted);
    setError("");

    const cleaned = formatted.replace(/\D/g, "");

    if (cleaned.length === 8) {
      void searchAddress(cleaned);
    } else {
      setAddress(null);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!setCep(value)) {
      setError("Digite um CEP válido com 8 números.");
      return;
    }

    onClose();
  }

  function getFullAddress() {
    if (!address) return "";

    const parts = [
      address.logradouro,
      address.bairro,
      address.localidade && address.uf
        ? `${address.localidade} - ${address.uf}`
        : address.localidade,
    ].filter(Boolean);

    return parts.join(" · ");
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4 py-8 backdrop-blur-sm sm:px-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cep-modal-title"
        tabIndex={-1}
        className="border-border bg-background relative w-full max-w-lg overflow-hidden rounded-[2rem] border shadow-2xl"
      >
        {/* Cabeçalho */}
        <div className="px-7 pt-7 sm:px-8 sm:pt-8">
          <div className="flex items-start justify-between gap-5">
            <div className="flex min-w-0 items-start gap-4">
              <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                <FaMapMarkerAlt size={17} aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <h2
                  id="cep-modal-title"
                  className="text-foreground font-serif text-2xl leading-tight font-semibold"
                >
                  Onde você está?
                </h2>

                <p className="text-muted mt-2 max-w-sm text-xs leading-5">
                  Informe seu CEP para estimarmos o valor e o prazo de entrega
                  para sua região.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="border-border text-muted hover:bg-muted hover:text-foreground flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition"
            >
              <FaTimes size={13} />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="px-7 pt-7 pb-7 sm:px-8 sm:pb-8">
          <form onSubmit={handleSubmit}>
            {/* CEP */}
            <div>
              <label
                htmlFor="global-cep"
                className="text-muted mb-2.5 block text-[11px] font-bold tracking-[0.14em] uppercase"
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
                  onChange={(event) => handleCepChange(event.target.value)}
                  placeholder="00000-000"
                  className="border-border bg-background text-foreground placeholder:text-muted/50 focus:border-primary focus:ring-primary/10 h-14 w-full rounded-2xl border pr-4 pl-10 text-sm font-medium transition outline-none focus:ring-2"
                />
              </div>

              {error && (
                <p className="text-destructive mt-2.5 text-xs">{error}</p>
              )}
            </div>

            {/* Endereço encontrado */}
            {(loadingAddress || address) && (
              <div className="border-border bg-muted/20 mt-5 rounded-2xl border p-5">
                {loadingAddress ? (
                  <div className="flex min-h-[54px] items-center gap-3">
                    <div className="border-primary/30 border-t-primary h-4 w-4 shrink-0 animate-spin rounded-full border-2" />

                    <p className="text-muted text-xs">
                      Localizando seu endereço...
                    </p>
                  </div>
                ) : address ? (
                  <div className="flex items-start gap-3.5">
                    <div className="bg-primary/10 text-primary mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                      <FaMapMarkerAlt size={12} aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-muted text-[10px] font-bold tracking-[0.12em] uppercase">
                        Seu endereço
                      </p>

                      <p className="text-foreground mt-1.5 text-sm leading-6 font-semibold">
                        {getFullAddress()}
                      </p>

                      {address.complemento && (
                        <p className="text-muted mt-1 text-xs">
                          {address.complemento}
                        </p>
                      )}

                      <p className="text-muted mt-1.5 text-xs">
                        CEP {formatStoredCep(address.cep ?? value)}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* Aviso sobre o frete */}
            <div className="border-primary/20 bg-primary/[0.06] mt-5 rounded-2xl border p-5">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                  <FaInfoCircle size={14} aria-hidden="true" />
                </div>

                <div>
                  <p className="text-foreground text-xs font-bold">
                    Importante sobre o frete
                  </p>

                  <p className="text-muted mt-1.5 text-[11px] leading-5">
                    Os valores e prazos mostrados na loja são{" "}
                    <strong className="text-foreground">
                      apenas estimativas
                    </strong>
                    . O valor final pode variar conforme o serviço de entrega, o
                    peso, as dimensões do pacote e as condições da
                    transportadora.
                  </p>
                </div>
              </div>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary-hover mt-6 flex h-14 w-full cursor-pointer items-center justify-center rounded-2xl px-5 text-sm font-semibold shadow-md transition hover:-translate-y-0.5"
            >
              Salvar CEP
            </button>

            <p className="text-muted mt-4 text-center text-[10px] leading-4">
              Seu CEP ficará salvo e será usado para calcular os fretes
              automaticamente pela loja.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
