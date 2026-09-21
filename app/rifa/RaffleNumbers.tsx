"use client";

import { BRAND, WHATSAPP } from "@/data/config";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type RaffleNumbersProps = {
  rafflePrice: number;
};

type RaffleNumber = {
  NUMERO: string;
  PAGO: string;
  WHATSAPP?: string;
  SORTEADO?: string;
};

const CONFETTI = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: `${(index * 47) % 100}%`,
  delay: `${(index % 10) * 0.08}s`,
  duration: `${2.5 + (index % 6) * 0.15}s`,
  rotation: `${(index * 37) % 360}deg`,
  width: `${5 + (index % 3) * 2}px`,
  height: `${8 + (index % 4) * 3}px`,
  drift: `${-80 + ((index * 53) % 160)}px`,
}));

export default function RaffleNumbers({ rafflePrice }: RaffleNumbersProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);

  const [raffleNumbers, setRaffleNumbers] = useState<RaffleNumber[]>([]);

  const [winner, setWinner] = useState<string>("");
  const [winNumber, setWinNumber] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const winnerRef = useRef<HTMLDivElement>(null);

  const [celebrationStarted, setCelebrationStarted] = useState(false);

  const loadSheet = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://opensheet.elk.sh/1G_-cEKzvojtO6-zR86oalbrp5JvQvIEat8rShhCsaP8/Rifa-Florisse?raw=true",
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const data = await response.json();

      const formattedData: RaffleNumber[] = data.map((item: RaffleNumber) => ({
        NUMERO: String(item.NUMERO).padStart(2, "0"),
        PAGO: String(item.PAGO),
        WHATSAPP: String(item.WHATSAPP || ""),
        SORTEADO: String(item.SORTEADO || "0"),
      }));

      setRaffleNumbers(formattedData);

      const winnerData = formattedData.find(
        (item) => Number(item.SORTEADO) === 1,
      );

      setWinNumber(winnerData?.NUMERO || "");

      setWinner(winnerData?.WHATSAPP ? winnerData.WHATSAPP.slice(-4) : "");
    } catch (error) {
      console.error("Erro ao carregar rifa:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSheet();
  }, [loadSheet]);

  const toggleNumber = (number: string) => {
    setSelectedNumbers((previous) =>
      previous.includes(number)
        ? previous.filter((item) => item !== number)
        : [...previous, number],
    );
  };

  const sortedNumbers = useMemo(
    () => [...selectedNumbers].sort((a, b) => Number(a) - Number(b)),
    [selectedNumbers],
  );

  const total = useMemo(
    () => selectedNumbers.length * rafflePrice,
    [selectedNumbers, rafflePrice],
  );

  const allNumbersFilled =
    raffleNumbers.length > 0 &&
    raffleNumbers.every((item) => Number(item.PAGO) === 1);

  const raffleHasWinner = winner !== "" && winNumber !== "";

  /*
   * Inicia a comemoração somente quando
   * o card do vencedor entra na tela.
   */
  useEffect(() => {
    if (!raffleHasWinner || !winnerRef.current) {
      return;
    }

    const element = winnerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !celebrationStarted) {
          setCelebrationStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [raffleHasWinner, celebrationStarted]);

  const finishOrder = () => {
    if (selectedNumbers.length === 0) {
      return;
    }

    const message = encodeURIComponent(
      `Olá! Vim pelo site da ${BRAND}.

Quero participar da rifa.

Números escolhidos: ${sortedNumbers.join(", ")}
Total: R$ ${total.toFixed(2)}`,
    );

    window.open(`${WHATSAPP}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="border-border/70 bg-background flex min-h-80 items-center justify-center rounded-4xl border">
        <div className="text-center">
          <span className="border-border border-t-primary mx-auto flex h-9 w-9 animate-spin rounded-full border-2" />

          <p className="text-muted mt-4 text-sm">Carregando números...</p>
        </div>
      </div>
    );
  }

  if (allNumbersFilled) {
    return (
      <div
        ref={winnerRef}
        className="border-border/70 bg-background relative overflow-hidden rounded-4xl border px-5 py-14 text-center sm:px-8"
      >
        {/* CONFETES */}
        {raffleHasWinner && celebrationStarted && (
          <div
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
            aria-hidden="true"
          >
            {CONFETTI.map((confetti) => (
              <span
                key={confetti.id}
                className="absolute -top-5 block animate-[winner-confetti_2.8s_ease-out_forwards]"
                style={
                  {
                    left: confetti.left,
                    width: confetti.width,
                    height: confetti.height,
                    animationDelay: confetti.delay,
                    "--drift": confetti.drift,
                    "--rotation": confetti.rotation,
                  } as React.CSSProperties
                }
              >
                <span
                  className={`block h-full w-full rounded-xs ${
                    confetti.id % 4 === 0
                      ? "bg-primary"
                      : confetti.id % 4 === 1
                        ? "bg-foreground/70"
                        : confetti.id % 4 === 2
                          ? "bg-primary/50"
                          : "bg-border"
                  }`}
                />
              </span>
            ))}
          </div>
        )}

        {/* CONTEÚDO */}
        <div
          className={`relative z-20 ${
            raffleHasWinner && celebrationStarted
              ? "animate-[winner-content_0.7s_ease-out]"
              : ""
          }`}
        >
          <div
            className={`bg-primary/10 text-primary mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl ${
              raffleHasWinner && celebrationStarted
                ? "animate-[winner-badge_0.8s_ease-out]"
                : ""
            }`}
          >
            {raffleHasWinner ? "🎉" : "◷"}
          </div>

          <p className="text-primary mt-6 text-[10px] font-semibold tracking-[0.2em] uppercase">
            {raffleHasWinner
              ? "Resultado da rifa"
              : "Todos os números preenchidos"}
          </p>

          <h3 className="text-foreground mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {raffleHasWinner
              ? `O número ${winNumber} venceu.`
              : "Agora é só aguardar o sorteio."}
          </h3>

          <p className="text-muted mx-auto mt-4 max-w-lg text-sm leading-7">
            {raffleHasWinner
              ? "O vencedor foi definido pelos 2 últimos números do 1º prêmio da Loteria Federal."
              : "O sorteio será realizado utilizando o resultado oficial da Loteria Federal da próxima quarta-feira ou sábado."}
          </p>

          {raffleHasWinner && (
            <div className="border-primary/15 bg-primary/5 mt-6 inline-flex items-center gap-3 rounded-2xl border px-5 py-4">
              <span className="text-muted text-xs">Pessoa sorteada</span>

              <span className="text-primary font-serif text-xl font-semibold tracking-wider">
                XXXX-{winner}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="border-border/70 bg-background overflow-hidden rounded-4xl border">
      {/* Cabeçalho da cartela */}
      <div className="border-border/70 flex flex-col gap-3 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <p className="text-primary text-[10px] font-semibold tracking-[0.2em] uppercase">
            Cartela
          </p>

          <h3 className="text-foreground mt-1 font-serif text-xl font-semibold">
            Números disponíveis
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-muted text-xs">
            R$ {rafflePrice.toFixed(2)} cada
          </span>

          <button
            type="button"
            onClick={() => void loadSheet()}
            disabled={loading}
            className="border-border bg-card-soft text-foreground hover:bg-card cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            Atualizar
          </button>
        </div>
      </div>

      {/* Números */}
      <div className="px-5 py-6 sm:px-7 sm:py-7">
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 sm:gap-2.5 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15">
          {raffleNumbers.map((item) => {
            const paid = Number(item.PAGO) === 1;

            const selected = selectedNumbers.includes(item.NUMERO);

            return (
              <button
                key={item.NUMERO}
                type="button"
                disabled={paid}
                onClick={() => toggleNumber(item.NUMERO)}
                aria-pressed={selected}
                aria-label={`Número ${item.NUMERO}${
                  paid
                    ? ", indisponível"
                    : selected
                      ? ", selecionado"
                      : ", disponível"
                }`}
                className={`aspect-square rounded-xl border text-sm font-semibold transition-all duration-200 sm:rounded-2xl sm:text-base ${
                  paid
                    ? "border-border/50 bg-muted/10 text-muted cursor-not-allowed opacity-50"
                    : selected
                      ? "border-primary bg-primary text-primary-foreground shadow-primary/20 scale-[1.04] shadow-md"
                      : "border-primary/10 bg-primary/8 text-primary hover:border-primary/30 hover:bg-primary/15 cursor-pointer hover:-translate-y-0.5 hover:shadow-sm"
                }`}
              >
                {item.NUMERO}
              </button>
            );
          })}
        </div>

        {/* Legenda */}
        <div className="border-border/70 text-muted mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4 text-xs">
          <Legend color="bg-primary/10 border-primary/20" label="Disponível" />

          <Legend color="bg-primary border-primary" label="Selecionado" />

          <Legend color="bg-muted/10 border-border/50" label="Reservado" />
        </div>
      </div>

      {/* Resumo */}
      <div className="border-border/70 bg-card-soft/50 border-t px-5 py-5 sm:px-7 sm:py-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-muted text-[10px] font-semibold tracking-[0.2em] uppercase">
              Sua seleção
            </p>

            <p className="text-foreground mt-2 min-h-6 text-sm font-semibold wrap-break-word">
              {sortedNumbers.length > 0
                ? sortedNumbers.join(" · ")
                : "Nenhum número selecionado"}
            </p>
          </div>

          <div className="border-border/70 bg-background flex items-center justify-between gap-6 rounded-2xl border px-4 py-4 lg:min-w-65">
            <div>
              <p className="text-muted text-[10px] font-semibold tracking-[0.18em] uppercase">
                Total
              </p>

              <p className="text-muted mt-1 text-sm">
                {selectedNumbers.length}{" "}
                {selectedNumbers.length === 1 ? "número" : "números"}
              </p>
            </div>

            <p className="text-primary font-serif text-3xl font-semibold">
              R$ {total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Aviso */}
        <div className="mt-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/8 px-4 py-3.5">
          <p className="text-xs font-semibold text-yellow-700">Atenção</p>

          <p className="mt-1 text-xs leading-relaxed text-yellow-700/80">
            O número só é garantido após o envio do comprovante de pagamento. Se
            outra pessoa concluir o pagamento primeiro, o número poderá ser
            destinado a ela.
          </p>
        </div>

        {/* WhatsApp */}
        <button
          type="button"
          disabled={selectedNumbers.length === 0}
          onClick={finishOrder}
          className="bg-primary text-primary-foreground shadow-primary/10 mt-4 w-full cursor-pointer rounded-2xl px-5 py-4 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          Continuar pelo WhatsApp
        </button>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden="true" className={`h-3 w-3 rounded border ${color}`} />

      <span>{label}</span>
    </div>
  );
}
