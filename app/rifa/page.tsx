"use client";

import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { FaClover, FaShareFromSquare } from "react-icons/fa6";

import { BRAND, CITY, RAFFLEITEM, RAFFLEPRICE } from "@/data/config";

import RaffleGallery from "./RaffleGallery";
import RaffleNumbers from "./RaffleNumbers";

export default function RafflePage() {
  const [copied, setCopied] = useState(false);

  const compartilharRifa = async () => {
    const url = window.location.href;

    if (!navigator.share) {
      try {
        await navigator.clipboard.writeText(url);

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch {
        // Não faz nada caso não seja possível copiar.
      }

      return;
    }

    try {
      await navigator.share({
        title: `Rifa ${BRAND} | ${RAFFLEITEM.name}`,
        text: `Olha essa rifa da ${BRAND}! 🧶✨`,
        url,
      });
    } catch {
      // O usuário pode simplesmente ter cancelado o compartilhamento.
    }
  };

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 pt-2 pb-16 sm:px-6 lg:px-8">
        {/* VOLTAR */}
        <div className="mb-2 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group text-muted hover:bg-muted/10 hover:text-primary focus-visible:ring-primary flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />

            <span>Voltar</span>
          </Link>
        </div>

        {/* CABEÇALHO */}
        <section className="pt-4 pb-8 sm:pb-10">
          <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
            Rifa {BRAND}
          </p>

          <h1 className="text-foreground mt-3 max-w-3xl font-serif text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
            Um pedacinho da <span className="text-primary">Florisse</span> na
            sua casa.
          </h1>

          <p className="text-muted mt-4 max-w-2xl text-sm leading-7 sm:text-base">
            Concorra a um conjunto de mesa posta feito à mão, preparado com o
            mesmo cuidado das peças da Florisse.
          </p>
        </section>

        {/* PRODUTO + INFORMAÇÕES */}
        <section>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-16 xl:gap-20">
            {/* GALERIA */}
            <RaffleGallery
              productName={RAFFLEITEM.name}
              images={RAFFLEITEM.image}
            />

            {/* INFORMAÇÕES */}
            <div className="flex flex-col lg:pt-1">
              <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
                {RAFFLEITEM.category}
              </p>

              <h2 className="text-foreground mt-3 font-serif text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
                {RAFFLEITEM.name}
              </h2>

              <p className="text-muted mt-4 text-sm leading-7">
                {RAFFLEITEM.description}
              </p>

              {/* CARACTERÍSTICAS */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <FaClover size={15} className="text-primary shrink-0" />

                  <span className="text-foreground text-sm">
                    6 sousplats · 37 cm
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaClover size={15} className="text-primary shrink-0" />

                  <span className="text-foreground text-sm">
                    1 trilho de mesa · 100 × 25 cm
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaHeart size={15} className="text-primary shrink-0" />

                  <span className="text-foreground text-sm">Feito à mão</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt size={15} className="text-primary shrink-0" />

                  <span className="text-foreground text-sm">
                    Produzido em {CITY}
                  </span>
                </div>
              </div>

              <div className="bg-border my-8 h-px w-full" />

              {/* PREÇO */}
              <div>
                <p className="text-muted text-xs font-semibold tracking-[0.18em] uppercase">
                  Seu número por apenas
                </p>

                <div className="mt-2 flex items-end gap-1">
                  <span className="text-primary mb-2 text-lg font-semibold">
                    R$
                  </span>

                  <span className="text-primary font-serif text-6xl leading-none font-semibold tracking-tight sm:text-7xl">
                    {Math.floor(RAFFLEPRICE)}
                  </span>

                  <span className="text-primary mb-1 text-2xl font-semibold">
                    ,
                    {Math.round((RAFFLEPRICE % 1) * 100)
                      .toString()
                      .padStart(2, "0")}
                  </span>
                </div>

                <p className="text-muted mt-2 text-sm">por número</p>
              </div>

              {/* INFORMAÇÕES DA RIFA */}
              <div className="border-border bg-card-soft/40 mt-6 rounded-3xl border p-5">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                    <FaClover size={14} aria-hidden="true" />
                  </div>

                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      Sorteio pela Loteria Federal
                    </p>

                    <p className="text-muted mt-1 text-xs leading-5">
                      O vencedor será definido pelos 2 últimos números do 1º
                      prêmio da{" "}
                      <a
                        href="https://loterias.caixa.gov.br/paginas/federal.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-medium hover:underline"
                      >
                        Loteria Federal
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <div className="border-border mt-5 border-t pt-5">
                  <div className="flex gap-3">
                    <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                      1
                    </span>

                    <p className="text-muted text-xs leading-5">
                      Escolha um ou mais números na cartela abaixo.
                    </p>
                  </div>

                  <div className="mt-3 flex gap-3">
                    <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                      2
                    </span>

                    <p className="text-muted text-xs leading-5">
                      Envie sua escolha pelo WhatsApp e siga as instruções para
                      pagamento.
                    </p>
                  </div>

                  <div className="mt-3 flex gap-3">
                    <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                      3
                    </span>

                    <p className="text-muted text-xs leading-5">
                      Assim que os 100 números forem preenchidos, o sorteio
                      acontecerá na próxima quarta-feira ou sábado.
                    </p>
                  </div>
                </div>
              </div>

              {/* COMPARTILHAR */}
              <button
                type="button"
                onClick={compartilharRifa}
                className="border-border bg-background text-foreground hover:bg-card-soft focus-visible:ring-primary mt-4 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <FaShareFromSquare
                  size={16}
                  className="text-primary"
                  aria-hidden="true"
                />

                {copied ? "Link copiado!" : "Compartilhar rifa"}
              </button>
            </div>
          </div>
        </section>

        {/* DIVISOR */}
        <div className="bg-border my-14 h-px sm:my-16" />

        {/* CARTELA */}
        <section id="numeros" className="scroll-mt-24">
          <div className="max-w-2xl">
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
              Cartela
            </p>

            <h2 className="text-foreground mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Escolha seu número
            </h2>

            <p className="text-muted mt-3 text-sm leading-7">
              Selecione um ou mais números disponíveis. Depois, envie seu pedido
              pelo WhatsApp para confirmar sua participação.
            </p>
          </div>

          <div className="mt-7">
            <RaffleNumbers rafflePrice={RAFFLEPRICE} />
          </div>
        </section>

        {/* RODAPÉ */}
        <div className="border-border mt-14 border-t pt-7">
          <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-muted text-xs">
              Rifa {BRAND} · {CITY}
            </p>

            <Link
              href="/#produtos"
              className="text-primary text-xs font-medium transition-colors hover:underline"
            >
              Conheça a Florisse
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
