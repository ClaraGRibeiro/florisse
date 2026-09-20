import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaClover } from "react-icons/fa6";

import {
  BRAND,
  CITY,
  RAFFLE,
  RAFFLEPRICE,
  SITE,
} from "@/data/config";

import RaffleNumbers from "./RaffleNumbers";

const raffleItems = [
  {
    title: "Sousplats + Trilho",
    subtitle: "Mesa posta",
    image:
      "/products/mesa-posta/trilho-tradicional/marrom-2.webp",
    details: [
      "6 sousplats · 37 cm",
      "1 trilho · 100 × 25 cm",
    ],
  },
];

export default function RafflePage() {
  if (!RAFFLE) {
    redirect("/");
  }

  const item = raffleItems[0];

  const whatsappText = encodeURIComponent(
    `RIFA ${BRAND.toUpperCase()}

Prêmio:
• ${item.title}
  - ${item.details.join("\n  - ")}

Apenas R$ ${RAFFLEPRICE.toFixed(2)} por número
100 números disponíveis
Sorteio pela Loteria Federal

Participe aqui:
${SITE}

Não perca essa chance!`,
  );

  const whatsappLink = `https://wa.me/?text=${whatsappText}`;

  return (
    <main className="min-h-screen bg-background">
      {/* =========================================================
          CABEÇALHO
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />

          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
          >
            <span aria-hidden="true">←</span>
            Voltar para a Florisse
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-2">
              <FaClover
                aria-hidden="true"
                className="text-[10px] text-primary sm:text-xs"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs">
                Rifa {BRAND}
              </span>
            </div>

            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Um pedacinho da
              <span className="text-primary"> Florisse</span>
              <br />
              na sua casa.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              Concorra a um kit de mesa posta feito à mão,
              pensado para deixar momentos simples ainda
              mais especiais.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRÊMIO + INFORMAÇÕES
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start xl:gap-12">
          {/* PRÊMIO */}
          <section>
            <div className="relative overflow-hidden rounded-4xl bg-muted/20 shadow-sm">
              <Image
                src={item.image}
                alt={item.title}
                width={1200}
                height={850}
                priority
                className="h-auto max-h-130 w-full object-cover object-center sm:max-h-145 lg:max-h-155"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent"
              />

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7 lg:p-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
                  O prêmio
                </p>

                <h2 className="mt-1 font-serif text-3xl font-semibold sm:text-4xl">
                  {item.title}
                </h2>

                <p className="mt-1 text-xs text-white/70">
                  {item.subtitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {item.details.map((detail) => (
                    <p
                      key={detail}
                      className="flex items-center gap-2 text-xs font-medium text-white/90"
                    >
                      <FaClover
                        aria-hidden="true"
                        className="text-[10px]"
                      />

                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* FRETE */}
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background text-sm shadow-sm">
                <span aria-hidden="true">↗</span>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Frete por conta do participante
                </p>

                <p className="mt-0.5 text-xs leading-5 text-muted">
                  O valor é calculado conforme o endereço de
                  entrega.
                </p>
              </div>
            </div>
          </section>

          {/* INFORMAÇÕES */}
          <section className="lg:sticky lg:top-8">
            {/* PREÇO */}
            <div className="rounded-4xl border border-border/70 bg-card-soft/60 p-6 sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                Seu número por apenas
              </p>

              <div className="mt-2 flex items-end">
                <span className="mb-2 mr-1 text-lg font-semibold text-primary">
                  R$
                </span>

                <span className="font-serif text-7xl font-semibold leading-none tracking-tight text-primary sm:text-8xl">
                  {Math.floor(RAFFLEPRICE)}
                </span>

                <span className="mb-1 text-2xl font-semibold text-primary">
                  ,
                  {Math.round(
                    (RAFFLEPRICE % 1) * 100,
                  )
                    .toString()
                    .padStart(2, "0")}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">
                por número
              </p>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border/70 pt-5 text-xs text-muted">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                  />
                  100 números disponíveis
                </span>

                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                  />
                  Feito à mão
                </span>

                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                  />
                  {CITY}
                </span>
              </div>
            </div>

            {/* COMO FUNCIONA */}
            <div className="mt-4 rounded-4xl border border-border/70 bg-background p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                    Como funciona
                  </p>

                  <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground">
                    Sorteio pela Federal
                  </h2>
                </div>

                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base text-primary"
                >
                  <FaClover />
                </span>
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    1
                  </span>

                  <p className="text-sm leading-6 text-muted">
                    O vencedor será definido pelos 2 últimos
                    números do 1º prêmio da{" "}
                    <a
                      href="https://loterias.caixa.gov.br/paginas/federal.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      Loteria Federal
                    </a>
                    .
                  </p>
                </div>

                <div className="flex gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    2
                  </span>

                  <p className="text-sm leading-6 text-muted">
                    Assim que os 100 números forem preenchidos,
                    o sorteio acontecerá na próxima quarta-feira
                    ou sábado.
                  </p>
                </div>
              </div>
            </div>

            {/* COMPARTILHAR */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-card-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Compartilhar rifa
            </a>
          </section>
        </div>
      </section>

      {/* =========================================================
          NÚMEROS
      ========================================================= */}
      <section
        id="numeros"
        className="border-t border-border/60 bg-card-soft/30"
      >
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <FaClover
                aria-hidden="true"
                className="text-xs text-primary"
              />

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Cartela
              </p>
            </div>

            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Escolha seu número
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              Selecione um ou mais números disponíveis. Depois,
              envie seu pedido pelo WhatsApp para confirmar sua
              participação.
            </p>
          </div>

          <div className="mt-7">
            <RaffleNumbers rafflePrice={RAFFLEPRICE} />
          </div>
        </div>
      </section>

      {/* =========================================================
          RODAPÉ
      ========================================================= */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-xs text-muted">
              Rifa {BRAND} · {CITY}
            </p>

            <Link
              href="/"
              className="text-xs font-medium text-primary transition-colors hover:underline"
            >
              Conheça a Florisse
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}