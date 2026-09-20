import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FaArrowLeft,
  FaHeart,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { FaClover } from "react-icons/fa6";

import {
  BRAND,
  CITY,
  RAFFLE,
  RAFFLEITEM,
  RAFFLEPRICE,
  SITE,
} from "@/data/config";

import RaffleGallery from "./RaffleGallery";
import RaffleNumbers from "./RaffleNumbers";
import FreightSimulator from "./FreightSimulator";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const image = `${SITE}${RAFFLEITEM.image[0]}`;

  const title = `Rifa ${BRAND} | ${RAFFLEITEM.name}`;

  const description =
    "Concorra a um conjunto de mesa posta feito à mão pela Florisse.";

  const url = `${SITE}/rifa`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: BRAND,
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: image,
          width: 800,
          height: 800,
          alt: `Rifa ${BRAND} — ${RAFFLEITEM.name}`,
          type: "image/webp",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function RafflePage() {
  if (!RAFFLE) {
    redirect("/");
  }

  const whatsappText =
    encodeURIComponent(
      `RIFA ${BRAND.toUpperCase()}

Prêmio: ${RAFFLEITEM.name}
• ${RAFFLEITEM.details.join("\n• ")}

Valor: R$ ${RAFFLEPRICE.toFixed(2).replace(".", ",")} por número
100 números disponíveis
Sorteio pela Loteria Federal

Participe:
${SITE}`,
    );

  const whatsappLink =
    `https://wa.me/?text=${whatsappText}`;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-2 sm:px-6 lg:px-8">
        {/* VOLTAR */}
        <div className="mb-2 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-muted/10 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />

            <span>Voltar</span>
          </Link>
        </div>

        {/* CABEÇALHO */}
        <section className="pb-8 pt-4 sm:pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Rifa {BRAND}
          </p>

          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Um pedacinho da{" "}
            <span className="text-primary">
              Florisse
            </span>{" "}
            na sua casa.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Concorra a um conjunto de mesa posta
            feito à mão, preparado com o mesmo
            cuidado das peças da Florisse.
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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {RAFFLEITEM.category}
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                {RAFFLEITEM.name}
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted">
                {RAFFLEITEM.description}
              </p>

              {/* CARACTERÍSTICAS */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <FaClover
                    size={15}
                    className="shrink-0 text-primary"
                  />

                  <span className="text-sm text-foreground">
                    6 sousplats · 37 cm
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaClover
                    size={15}
                    className="shrink-0 text-primary"
                  />

                  <span className="text-sm text-foreground">
                    1 trilho de mesa · 100 × 25 cm
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaHeart
                    size={15}
                    className="shrink-0 text-primary"
                  />

                  <span className="text-sm text-foreground">
                    Feito à mão
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt
                    size={15}
                    className="shrink-0 text-primary"
                  />

                  <span className="text-sm text-foreground">
                    Produzido em {CITY}
                  </span>
                </div>
              </div>

              <div className="my-8 h-px w-full bg-border" />

              {/* PREÇO */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Seu número por apenas
                </p>

                <div className="mt-2 flex items-end gap-1">
                  <span className="mb-2 text-lg font-semibold text-primary">
                    R$
                  </span>

                  <span className="font-serif text-6xl font-semibold leading-none tracking-tight text-primary sm:text-7xl">
                    {Math.floor(
                      RAFFLEPRICE,
                    )}
                  </span>

                  <span className="mb-1 text-2xl font-semibold text-primary">
                    ,
                    {Math.round(
                      (RAFFLEPRICE % 1) *
                      100,
                    )
                      .toString()
                      .padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted">
                  por número
                </p>
              </div>

              {/* INFORMAÇÕES DA RIFA */}
              <div className="mt-6 rounded-3xl border border-border bg-card-soft/40 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <FaClover
                      size={14}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Sorteio pela Loteria Federal
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted">
                      O vencedor será definido
                      pelos 2 últimos números
                      do 1º prêmio da{" "}
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
                </div>

                <div className="mt-5 border-t border-border pt-5">
                  <div className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      1
                    </span>

                    <p className="text-xs leading-5 text-muted">
                      Escolha um ou mais
                      números na cartela
                      abaixo.
                    </p>
                  </div>

                  <div className="mt-3 flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      2
                    </span>

                    <p className="text-xs leading-5 text-muted">
                      Envie sua escolha pelo
                      WhatsApp e siga as
                      instruções para pagamento.
                    </p>
                  </div>

                  <div className="mt-3 flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      3
                    </span>

                    <p className="text-xs leading-5 text-muted">
                      Assim que os 100 números
                      forem preenchidos, o
                      sorteio acontecerá na
                      próxima quarta-feira ou
                      sábado.
                    </p>
                  </div>
                </div>
              </div>

              {/* COMPARTILHAR */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-card-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <FaWhatsapp
                  size={16}
                  className="text-primary"
                  aria-hidden="true"
                />

                Compartilhar rifa
              </a>
            </div>
          </div>
        </section>

        {/* FRETE */}
        <FreightSimulator
          originCep={
            RAFFLEITEM.frete.cep_origem
          }
          weight={
            RAFFLEITEM.frete.peso
          }
          width={
            RAFFLEITEM.frete.largura
          }
          length={
            RAFFLEITEM.frete.comprimento
          }
          height={
            RAFFLEITEM.frete.altura
          }
        />

        {/* DIVISOR */}
        <div className="my-14 h-px bg-border sm:my-16" />

        {/* CARTELA */}
        <section
          id="numeros"
          className="scroll-mt-24"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Cartela
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Escolha seu número
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted">
              Selecione um ou mais números
              disponíveis. Depois, envie seu pedido
              pelo WhatsApp para confirmar sua
              participação.
            </p>
          </div>

          <div className="mt-7">
            <RaffleNumbers
              rafflePrice={RAFFLEPRICE}
            />
          </div>
        </section>

        {/* RODAPÉ */}
        <div className="mt-14 border-t border-border pt-7">
          <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-xs text-muted">
              Rifa {BRAND} · {CITY}
            </p>

            <Link
              href="/#produtos"
              className="text-xs font-medium text-primary transition-colors hover:underline"
            >
              Conheça a Florisse
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}