"use client";

import { FormEvent, useState } from "react";
import {
  FaCheck,
  FaChevronDown,
  FaMapMarkerAlt,
  FaTruck,
} from "react-icons/fa";

type FreightSimulatorProps = {
  originCep: number | string;
  weight: number;
  width: number;
  length: number;
  height: number;
};

type FreightOption = {
  id?: string | number;
  name?: string;
  service?: string | number;
  service_name?: string;
  company?: {
    name?: string;
  };
  company_name?: string;
  price?: number | string;
  custom_price?: number | string;
  final_price?: number | string;
  delivery_time?: number | string;
  deliveryTime?: number | string;
  deadline?: number | string;
  delivery_range?: {
    min?: number;
    max?: number;
  };
};

type FreightResponse = {
  success?: boolean;
  services?: FreightOption[];
  error?: string;
};

function cleanCep(value: string) {
  return value.replace(/\D/g, "");
}

function formatCep(value: string) {
  const digits = cleanCep(value).slice(0, 8);

  if (digits.length <= 5) {
    return digits;
  }

  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function formatCurrency(value: unknown) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return null;
  }

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function getServiceName(option: FreightOption) {
  if (option.name) {
    return option.name;
  }

  if (option.service_name) {
    return option.service_name;
  }

  if (option.company?.name) {
    return option.company.name;
  }

  if (option.company_name) {
    return option.company_name;
  }

  const service = String(option.service ?? "");

  switch (service) {
    case "1":
      return "PAC";

    case "2":
      return "Sedex";

    case "3":
      return "Jadlog";

    case "33":
      return "J&T";

    case "31":
      return "Loggi";

    case "17":
      return "Mini Envios";

    default:
      return "Opção de envio";
  }
}

function getPrice(option: FreightOption): number {
  const price = option.custom_price ?? option.price ?? option.final_price;

  if (price === undefined) {
    return 0;
  }

  return Number(price) * 1.5;
}

function getDeadline(option: FreightOption) {
  if (
    option.delivery_range &&
    (option.delivery_range.min !== undefined ||
      option.delivery_range.max !== undefined)
  ) {
    const min = option.delivery_range.min;

    const max = option.delivery_range.max;

    if (min !== undefined && max !== undefined && min !== max) {
      return `${min}–${max} dias úteis`;
    }

    const days = min ?? max;

    if (days !== undefined) {
      return `${days} dias úteis`;
    }
  }

  const deadline =
    option.delivery_time ?? option.deliveryTime ?? option.deadline;

  if (deadline !== undefined && deadline !== null && String(deadline).trim()) {
    const value = String(deadline);

    if (value.toLowerCase().includes("dia")) {
      return value;
    }

    return `${value} dias úteis`;
  }

  return null;
}

function sortByPrice(options: FreightOption[]) {
  return [...options].sort((a, b) => {
    const priceA = Number(getPrice(a));

    const priceB = Number(getPrice(b));

    if (!Number.isFinite(priceA) && !Number.isFinite(priceB)) {
      return 0;
    }

    if (!Number.isFinite(priceA)) {
      return 1;
    }

    if (!Number.isFinite(priceB)) {
      return -1;
    }

    return priceA - priceB;
  });
}

export default function FreightSimulator({
  originCep,
  weight,
  width,
  length,
  height,
}: FreightSimulatorProps) {
  const [cep, setCep] = useState("");

  const [options, setOptions] = useState<FreightOption[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateFreight = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const destinationCep = cleanCep(cep);

    if (destinationCep.length !== 8) {
      setError("Digite um CEP válido com 8 números.");

      setOptions([]);
      setHasCalculated(false);

      return;
    }

    setLoading(true);
    setError("");
    setOptions([]);
    setHasCalculated(false);

    try {
      const response = await fetch("/api/frete", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          from: cleanCep(String(originCep)),

          to: destinationCep,

          weight,
          width,
          length,
          height,
        }),
      });

      const data = (await response.json()) as FreightResponse;

      if (!response.ok) {
        throw new Error(data.error || "Não foi possível calcular o frete.");
      }

      const services = sortByPrice(data.services ?? []);

      if (!services.length) {
        throw new Error("Nenhuma opção de envio foi encontrada para esse CEP.");
      }

      setOptions(services);
      setHasCalculated(true);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível calcular o frete agora.",
      );

      setOptions([]);
      setHasCalculated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-border bg-card-soft/40 mt-10 rounded-3xl border p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
          <FaTruck size={14} aria-hidden="true" />
        </div>

        <div>
          <p className="text-foreground text-sm font-semibold">
            Calcule o frete
          </p>

          <p className="text-muted mt-1 text-xs leading-5">
            Informe seu CEP para consultar o valor{" "}
            <span className="font-semibold">(estimativa)</span> da entrega.
          </p>
        </div>
      </div>

      <form onSubmit={calculateFreight} className="mt-5">
        <label
          htmlFor="freight-cep"
          className="text-muted mb-2 block text-xs font-semibold tracking-[0.12em] uppercase"
        >
          CEP de destino
        </label>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <FaMapMarkerAlt
              size={13}
              className="text-muted pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
              aria-hidden="true"
            />

            <input
              id="freight-cep"
              name="cep"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={9}
              placeholder="00000-000"
              value={formatCep(cep)}
              onChange={(event) => setCep(formatCep(event.target.value))}
              className="border-border bg-background text-foreground placeholder:text-muted/60 focus:border-primary focus:ring-primary/10 h-12 w-full rounded-full border pr-4 pl-10 text-sm transition-colors outline-none focus:ring-2"
              aria-describedby="freight-help"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground h-12 cursor-pointer rounded-full px-6 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Calculando..." : "Calcular frete"}
          </button>
        </div>
      </form>

      {error && (
        <div className="border-destructive/20 bg-destructive/5 mt-4 rounded-2xl border px-4 py-3">
          <p className="text-destructive text-xs leading-5">{error}</p>
        </div>
      )}

      {hasCalculated && options.length > 0 && (
        <div className="border-border mt-5 border-t pt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-foreground text-sm font-semibold">
                Opções disponíveis
              </p>

              <p className="text-muted mt-1 text-xs leading-relaxed">
                Frete estimado pela SuperFrete com base nas dimensões de{" "}
                {length} × {height} × {width} cm e peso de {weight} kg.
              </p>
            </div>

            <FaCheck size={13} className="text-primary" aria-hidden="true" />
          </div>

          <div className="mt-4 space-y-2">
            {options.map((option, index) => {
              const price = formatCurrency(getPrice(option));

              const deadline = getDeadline(option);

              const serviceName = getServiceName(option);

              return (
                <div
                  key={`${String(
                    option.id ?? option.service ?? serviceName,
                  )}-${index}`}
                  className="border-border bg-background flex items-center justify-between gap-4 rounded-2xl border px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-primary text-sm font-semibold">
                      {serviceName}
                    </p>

                    {deadline && (
                      <p className="text-muted mt-0.5 text-xs">
                        Prazo: {deadline}
                      </p>
                    )}
                  </div>

                  {price && (
                    <p className="text-primary shrink-0 font-serif text-xl font-semibold">
                      {price}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
