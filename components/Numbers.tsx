"use client";

import { useEffect, useMemo, useState } from "react";

type NumbersProps = {
  rafflePrice: number;
  setNumbersOpen: (value: boolean) => void;
};

type RaffleNumber = {
  NUMERO: string;
  PAGO: string;
};

const WHATSAPP = "5538992030710";

export default function Numbers({ rafflePrice, setNumbersOpen }: NumbersProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [raffleNumbers, setRaffleNumbers] = useState<RaffleNumber[]>([]);

  useEffect(() => {
    const loadSheet = async () => {
      try {
        const response = await fetch(
          "https://opensheet.elk.sh/1G_-cEKzvojtO6-zR86oalbrp5JvQvIEat8rShhCsaP8/Rifa-Florisse",
        );
        const data = await response.json();
        setRaffleNumbers(
          data.map((item: RaffleNumber) => ({
            NUMERO: String(item.NUMERO).padStart(2, "0"),
            PAGO: String(item.PAGO),
          })),
        );

        setRaffleNumbers(data);
      } catch (error) {
        console.error("Erro ao carregar rifa:", error);
      }
    };

    loadSheet();
  }, []);

  const toggleNumber = (number: string) => {
    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number],
    );
  };

  const sortedNumbers = useMemo(
    () => [...selectedNumbers].sort(),
    [selectedNumbers],
  );

  const total = useMemo(
    () => selectedNumbers.length * rafflePrice,
    [selectedNumbers, rafflePrice],
  );

  const finishOrder = () => {
    if (selectedNumbers.length === 0) return;

    const message =
      `Olá! Vim pelo site da Florisse.%0A` +
      `Quero participar da rifa.%0A%0A` +
      `Números escolhidos: ${sortedNumbers.join(", ")}%0A` +
      `Total: R$ ${total.toFixed(2)}`;

    window.open(`https://wa.me/${WHATSAPP}?text=${message}`, "_blank");
  };

  return (
    <div
      onClick={() => setNumbersOpen(false)}
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl sm:rounded-4xl border border-border bg-background p-4 sm:p-6 shadow-2xl"
      >
        {/* HEADER */}
        <header className="flex items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              🎟️ Escolha seu número
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-muted">
              Números verdes estão disponíveis
            </p>
          </div>

          <button
            onClick={() => setNumbersOpen(false)}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-card-soft text-lg transition hover:scale-105"
          >
            ✕
          </button>
        </header>

        {/* GRID NUMBERS */}
        <div className="mt-5 grid gap-2 grid-cols-8 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15">
          {raffleNumbers.map((item) => {
            const paid = Number(item.PAGO) === 1;
            const selected = selectedNumbers.includes(item.NUMERO);

            return (
              <button
                key={item.NUMERO}
                disabled={paid}
                onClick={() => toggleNumber(item.NUMERO)}
                className={`aspect-square rounded-xl sm:rounded-2xl text-lg sm:text-sm font-semibold transition-all ${
                  paid
                    ? "cursor-not-allowed bg-muted/20 text-muted opacity-60"
                    : selected
                      ? "scale-105 bg-primary text-white"
                      : "cursor-pointer bg-secondary text-white hover:scale-105"
                }`}
              >
                {item.NUMERO}
              </button>
            );
          })}
        </div>

        {/* LEGEND */}
        <div className="mt-5 flex flex-wrap gap-3 text-xs sm:text-sm text-secondary">
          <Legend color="bg-secondary" label="Disponível" />
          <Legend color="bg-primary" label="Selecionado" />
          <Legend color="bg-muted/20" label="Reservado" />
        </div>

        {/* SUMMARY */}
        <div className="mt-5 rounded-2xl sm:rounded-3xl border border-border bg-card-soft p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs sm:text-sm text-muted">
                Números escolhidos
              </p>

              <p className="mt-1 text-sm sm:text-lg font-bold wrap-break-word">
                {sortedNumbers.length > 0 ? sortedNumbers.join(", ") : "Nenhum"}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm text-muted">Total</p>

              <p className="text-2xl sm:text-3xl font-black text-primary">
                R$ {total.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-xs sm:text-sm text-yellow-700">
            <p className="font-semibold mb-1">⚠️ Importante</p>

            <p>
              Os números só são garantidos após envio do comprovante de
              pagamento.
            </p>

            <p className="mt-2">
              Caso o pagamento não seja confirmado e outro participante escolher
              o mesmo número antes, ele será destinado a quem concluir primeiro
              o pagamento.
            </p>
          </div>
          <button
            disabled={selectedNumbers.length === 0}
            onClick={finishOrder}
            className="cursor-pointer mt-4 w-full rounded-2xl bg-primary px-5 py-3 sm:py-4 text-sm font-semibold text-primary-foreground transition hover:scale-[1.01] disabled:opacity-50"
          >
            Finalizar escolha
          </button>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 sm:h-4 sm:w-4 rounded ${color}`} />
      <span>{label}</span>
    </div>
  );
}
