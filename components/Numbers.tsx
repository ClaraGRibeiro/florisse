"use client";

import { useEffect, useMemo, useState } from "react";

type NumbersProps = {
  rafflePrice: number;
  setNumbersOpen: (value: boolean) => void;
};

type RaffleNumber = {
  NUMERO: string;
  PAGO: string;
  WHATSAPP?: string;
  SORTEADO?: string;
};

const WHATSAPP = "5538992030710";

export default function Numbers({ rafflePrice, setNumbersOpen }: NumbersProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [raffleNumbers, setRaffleNumbers] = useState<RaffleNumber[]>([]);
  const [winner, setWinner] = useState<String>("");
  const [winNumber, setWinNumber] = useState<String>("");
  const [loading, setLoading] = useState(false);

  const loadSheet = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://opensheet.elk.sh/1G_-cEKzvojtO6-zR86oalbrp5JvQvIEat8rShhCsaP8/Rifa-Florisse?raw=true",
        {
          cache: "no-store",
        }
      );
      const data = await response.json();
      const formattedData = data.map((item: RaffleNumber) => ({
        NUMERO: String(item.NUMERO).padStart(2, "0"),
        PAGO: String(item.PAGO),
        WHATSAPP: String(item.WHATSAPP || ""),
        SORTEADO: String(item.SORTEADO || "0"),
      }));

      setRaffleNumbers(formattedData);
      setRaffleNumbers(data);
      const winnerData = raffleNumbers.find(
        (item) => Number(item.SORTEADO) === 1
      );

      setWinNumber(winnerData?.NUMERO || "");

      setWinner(winnerData?.WHATSAPP
        ? winnerData.WHATSAPP.slice(-4)
        : "");
    } catch (error) {
      console.error("Erro ao carregar rifa:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
  const allNumbersFilled =
    raffleNumbers.length > 0 &&
    raffleNumbers.every((item) => Number(item.PAGO) === 1);

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
        <header className="flex items-start justify-between gap-4 border-b border-border pb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${!allNumbersFilled
                  ? "bg-green-500"
                  : winner === "" && winNumber === ""
                    ? "bg-yellow-500"
                    : "bg-primary"
                  }`}
              />

              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                {!allNumbersFilled
                  ? "Rifa aberta"
                  : winner === "" && winNumber === ""
                    ? "Aguardando sorteio"
                    : "Resultado disponível"}
              </span>
            </div>

            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
              {!allNumbersFilled
                ? "🎟️ Escolha seu número"
                : winner === "" && winNumber === ""
                  ? "🎉 Rifa encerrada"
                  : "🏆 Resultado da Rifa"}
            </h2>

            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted">
              {!allNumbersFilled ? (
                <>
                  Os números em <span className="font-semibold text-secondary">verde</span> estão disponíveis para escolha.
                </>
              ) : winner === "" && winNumber === "" ? (
                <>
                  Todos os números já foram preenchidos. O sorteio será realizado
                  utilizando o resultado oficial da{" "}
                  <span className="font-semibold text-foreground">
                    Loteria Federal
                  </span>{" "}
                  da próxima quarta-feira ou sábado.
                </>
              ) : (
                <>
                  O número vencedor da rifa foi definido pelos últimos 2 dígitos do resultado da{" "}
                  <span className="font-semibold text-foreground">
                    Loteria Federal
                  </span>: {winNumber}
                </>
              )}
            </p>

            {winner !== "" && winNumber !== "" && (
              <div className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3">
                <span className="text-sm font-medium text-muted">
                  Pessoa sorteada
                </span>

                <span className="text-2xl font-black tracking-wider text-primary">
                  XXXX-{winner}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadSheet}
              disabled={loading}
              className="cursor-pointer flex min-w-32.5 items-center justify-center gap-2 rounded-xl border border-border bg-card-soft px-4 py-2 text-sm font-medium transition hover:scale-105 hover:bg-card disabled:opacity-50"
            >
              {loading ? "Atualizando..." : "Atualizar"}
            </button>

            <button
              onClick={() => setNumbersOpen(false)}
              className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card-soft text-lg transition-all hover:scale-105 hover:bg-card"
            >
              ✕
            </button>
          </div>
        </header>

        {/* GRID NUMBERS */}
        {!allNumbersFilled && !loading &&
          <>
            <div className="mt-5 grid gap-2 grid-cols-8 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15">
              {raffleNumbers.map((item) => {
                const paid = Number(item.PAGO) === 1;
                const selected = selectedNumbers.includes(item.NUMERO);
                return (
                  <button
                    key={item.NUMERO}
                    disabled={paid}
                    onClick={() => toggleNumber(item.NUMERO)}
                    className={`aspect-square rounded-xl sm:rounded-2xl text-lg sm:text-sm font-semibold transition-all ${paid
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
          </>
        }
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
