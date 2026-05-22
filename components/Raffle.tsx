import Image from "next/image";

type RaffleProps = {
  rafflePrice: number;
  setRaffleOpen: (value: boolean) => void;
  setNumbersOpen: (value: boolean) => void;
};

const raffleItems = [
  {
    title: "Tapetes + Passadeira",
    subtitle: "Jogo cozinha",
    image: "/products/jogos/jogo-passadeira-sara/bege.webp",
    details: ["2 tapetes (70x50cm)", "1 passadeira (120x50cm)"],
  },
  {
    title: "Sousplats + Trilho",
    subtitle: "Mesa posta",
    image: "/products/jogos/jogo-mesa-tradicional/bege.webp",
    details: ["6 sousplats (40cm)", "1 trilho (120x40cm)"],
  },
];

export default function Raffle({
  rafflePrice,
  setRaffleOpen,
  setNumbersOpen,
}: RaffleProps) {
  const closeModal = () => setRaffleOpen(false);

  const shareUrl = "https://florisse.vercel.app/";

  const whatsappText = encodeURIComponent(
    `RIFA FLORISSE

Prêmio incrível:
• ${raffleItems[0].title}
  - ${raffleItems[0].details.join("\n  - ")}

• ${raffleItems[1].title}
  - ${raffleItems[1].details.join("\n  - ")}

Apenas R$ ${rafflePrice},00 por número
100 números disponíveis
Sorteio pela Loteria Federal

Participe aqui:
${shareUrl}

Não perca essa chance!`,
  );

  const whatsappLink = `https://wa.me/?text=${whatsappText}`;
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-[2.5rem] border border-border bg-background shadow-2xl animate-in fade-in zoom-in duration-300"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <button
          onClick={closeModal}
          className="absolute top-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-lg shadow-lg backdrop-blur transition-all hover:scale-105"
        >
          ✕
        </button>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT */}
          <div className="flex min-h-80 flex-col justify-between bg-card-soft p-5 sm:p-8">
            <div>
              <div className="text-center sm:text-left inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-medium text-primary">
                🍀 RIFA FLORISSE 🍀
              </div>

              <h2 className="text-center sm:text-left mt-5 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                Jogo de cozinha
                <span className="block text-primary">artesanal completo</span>
              </h2>

              <p className="text-center sm:text-left mt-4 max-w-md text-sm sm:text-base text-muted">
                Concorra a um kit exclusivo feito à mão com tapetes, passadeira,
                sousplats e trilho de mesa 💖
              </p>
            </div>

            <div className="mt-8 flex flex-row items-center mx-auto sm:mx-0 gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Apenas
                </p>

                <div className="mt-1 flex items-end flex-wrap">
                  <span className="text-2xl font-bold text-primary">R$</span>

                  <span className="text-5xl sm:text-7xl font-black leading-none text-primary">
                    {rafflePrice}
                  </span>

                  <span className="text-xl font-bold text-primary">,00</span>
                </div>

                <p className="mt-2 text-sm text-muted">por número</p>
              </div>

              <div className="block h-24 w-px bg-border" />

              <div className="space-y-2 text-sm text-muted">
                <p>🎟️ 100 números</p>
                <p>📅 Sorteio pela Federal</p>
                <p>✨ Feito à mão</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {raffleItems.map((item, index) => (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="relative overflow-hidden rounded-3xl shadow-xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={700}
                      className="aspect-3/4 w-48 object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <p className="text-xs opacity-90">{item.subtitle}</p>

                      <h3 className="text-sm font-bold">{item.title}</h3>

                      <div className="mt-2 space-y-1 text-[11px] text-white/90">
                        {item.details.map((detail) => (
                          <p key={detail}>• {detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {index === 0 && (
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary text-xl font-light text-primary-foreground shadow-lg">
                      +
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-border bg-card-soft p-5">
              <h3 className="text-sm font-semibold uppercase text-foreground">
                Como será o sorteio
              </h3>

              <div className="mt-3 space-y-2 text-sm text-muted">
                <p>
                  O vencedor será definido pelos 2 últimos números do 1º prêmio
                  da{" "}
                  <a
                    href="https://loterias.caixa.gov.br/paginas/federal.aspx"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    Loteria Federal
                  </a>
                  .
                </p>

                <p>
                  Assim que todos os números forem preenchidos, o sorteio
                  acontecerá na próxima quarta-feira ou sábado.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <button className="w-full cursor-pointer rounded-2xl border border-border bg-card px-6 py-3 font-semibold transition-all hover:bg-input">
                  Compartilhar
                </button>
              </a>

              <button
                onClick={() => setNumbersOpen(true)}
                className="cursor-pointer w-full rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground shadow-xl transition hover:scale-[1.01]"
              >
                Escolher meu número
              </button>
            </div>

            <button
              onClick={closeModal}
              className="mt-3 text-sm text-muted hover:text-foreground"
            >
              Continuar navegando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
