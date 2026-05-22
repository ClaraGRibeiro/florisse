"use client";

import Papa from "papaparse";
import { useEffect, useMemo, useState } from "react";

type NumbersProps = {
  rafflePrice: number;
  setNumbersOpen: (value: boolean) => void;
};

type RaffleNumber = {
  NUMERO: string;
  PAGO: string;
};

const WHATSAPP =
  "5538992030710";

export default function Numbers({
  rafflePrice,
  setNumbersOpen,
}: NumbersProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [raffleNumbers, setRaffleNumbers] = useState<RaffleNumber[]>([]);

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch("/rifa.csv");
        const csvText = await response.text();

        Papa.parse<RaffleNumber>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: ({ data }) => {
            setRaffleNumbers(data);
          },
        });
      } catch (error) {
        console.error("Erro ao carregar rifa:", error);
      }
    };

    loadCSV();
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

    window.open(
      `https://wa.me/${WHATSAPP}?text=${message}`,
      "_blank",
    );
  };

  return (
    <div
      onClick={() => setNumbersOpen(false)}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-4xl border border-border bg-background p-6 shadow-2xl"
      >
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              🎟️ Escolha seu número
            </h2>

            <p className="mt-1 text-sm text-muted">
              Números verdes estão disponíveis
            </p>
          </div>

          <button
            onClick={() => setNumbersOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-card-soft text-lg transition hover:scale-105"
          >
            ✕
          </button>
        </header>

        <div className="mt-6 grid grid-cols-5 gap-1 sm:grid-cols-10 md:grid-cols-15">
          {raffleNumbers.map((item) => {
            const paid =
              item.PAGO?.toLowerCase() === "true";

            const selected = selectedNumbers.includes(
              item.NUMERO,
            );

            return (
              <button
                key={item.NUMERO}
                disabled={paid}
                onClick={() => toggleNumber(item.NUMERO)}
                className={`aspect-square h-10 w-10 rounded-2xl text-sm font-semibold transition-all ${
                  paid
                    ? "cursor-not-allowed bg-muted/20 text-muted opacity-60"
                    : selected
                      ? "scale-105 bg-white text-primary ring-2 ring-primary"
                      : "cursor-pointer bg-primary text-primary-foreground hover:scale-105"
                }`}
              >
                {item.NUMERO}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-secondary">
          <Legend color="bg-primary" label="Disponível" />

          <Legend
            color="bg-muted/20"
            label="Reservado"
          />
        </div>

        <div className="mt-6 rounded-3xl border border-border bg-card-soft p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted">
                Números escolhidos
              </p>

              <p className="mt-1 text-lg font-bold">
                {sortedNumbers.length > 0
                  ? sortedNumbers.join(", ")
                  : "Nenhum"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted">
                Total
              </p>

              <p className="text-3xl font-black text-primary">
                R$ {total.toFixed(2)}
              </p>
            </div>
          </div>

          <button
            disabled={selectedNumbers.length === 0}
            onClick={finishOrder}
            className="mt-5 w-full cursor-pointer rounded-2xl bg-primary px-5 py-4 font-semibold text-primary-foreground transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Finalizar escolha
          </button>
        </div>
      </div>
    </div>
  );
}

type LegendProps = {
  color: string;
  label: string;
};

function Legend({ color, label }: LegendProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-4 w-4 rounded ${color}`} />

      <span>{label}</span>
    </div>
  );
}