"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { CEP_ORIGEM, FREIGHT } from "@/data/config";

const CEP_STORAGE_KEY = "florisse-cep";
const FREIGHT_CACHE_KEY = "florisse-freight-cache";
const CACHE_TTL = 1000 * 60 * 60 * 6;

export type FreightOption = {
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

export type FreightEstimate = {
  price: number;
  serviceName: string;
  deadline: string | null;
};

type FreightResponse = {
  success?: boolean;
  services?: FreightOption[];
  error?: string;
};

type FreightCacheEntry = {
  savedAt: number;
  estimate: FreightEstimate | null;
};

type FreightCache = Record<string, FreightCacheEntry>;

type FreightContextType = {
  cep: string;
  setCep: (value: string) => boolean;
  clearCep: () => void;
};

export type CartFreightPackage = {
  id: string;
  quantity: number;
  weight: number;
  width: number;
  length: number;
  height: number;
};

type CartFreightResult = {
  total: number;
  loading: boolean;
  hasCep: boolean;
  unavailable: boolean;
};

const FreightContext = createContext<FreightContextType | undefined>(undefined);

function cleanCep(value: string) {
  return value.replace(/\D/g, "").slice(0, 8);
}

function isValidCep(value: string) {
  return /^\d{8}$/.test(value);
}

function getServiceName(option: FreightOption) {
  if (option.name) return option.name;
  if (option.service_name) return option.service_name;
  if (option.company?.name) return option.company.name;
  if (option.company_name) return option.company_name;

  switch (String(option.service ?? "")) {
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

function getRawPrice(option: FreightOption) {
  return Number(option.custom_price ?? option.price ?? option.final_price);
}

function getDisplayedPrice(option: FreightOption) {
  const price = getRawPrice(option);

  return Number.isFinite(price) ? Number((price * FREIGHT).toFixed(2)) : Infinity;
}

function formatDeadlineDays(value: number) {
  return `${value} ${value === 1 ? "dia útil" : "dias úteis"}`;
}

function getDeadline(option: FreightOption) {
  const range = option.delivery_range;

  if (range && (range.min !== undefined || range.max !== undefined)) {
    const min = range.min;
    const max = range.max;

    if (min !== undefined && max !== undefined) {
      if (min === max) {
        return formatDeadlineDays(min);
      }

      return `${min}–${max} dias úteis`;
    }

    const days = min ?? max;

    if (days !== undefined) {
      return formatDeadlineDays(days);
    }
  }

  const deadline =
    option.delivery_time ?? option.deliveryTime ?? option.deadline;

  if (deadline !== undefined && deadline !== null && String(deadline).trim()) {
    const value = String(deadline).trim();

    /*
     * Se a API já retornar algo como "1 dia útil",
     * preservamos o texto.
     */
    if (value.toLowerCase().includes("dia")) {
      return value;
    }

    const numericValue = Number(value);

    if (Number.isFinite(numericValue)) {
      return formatDeadlineDays(numericValue);
    }

    return `${value} dias úteis`;
  }

  return null;
}

function sortByPrice(options: FreightOption[]) {
  return [...options].sort(
    (a, b) => getDisplayedPrice(a) - getDisplayedPrice(b),
  );
}

function getCacheKey(
  cep: string,
  weight: number,
  width: number,
  length: number,
  height: number,
) {
  return [cep, weight, width, length, height].join("|");
}

function readCache(): FreightCache {
  try {
    const raw = localStorage.getItem(FREIGHT_CACHE_KEY);

    if (!raw) {
      return {};
    }

    const parsed: unknown = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    return parsed as FreightCache;
  } catch {
    return {};
  }
}

function writeCache(cache: FreightCache) {
  try {
    localStorage.setItem(FREIGHT_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Cache é apenas uma otimização.
  }
}

function readCachedEstimate(key: string): FreightEstimate | null | undefined {
  const cache = readCache();
  const entry = cache[key];

  if (!entry) {
    return undefined;
  }

  if (
    typeof entry.savedAt !== "number" ||
    Date.now() - entry.savedAt > CACHE_TTL
  ) {
    delete cache[key];
    writeCache(cache);

    return undefined;
  }

  return entry.estimate;
}

function saveCachedEstimate(key: string, estimate: FreightEstimate | null) {
  const cache = readCache();

  cache[key] = {
    savedAt: Date.now(),
    estimate,
  };

  const entries = Object.entries(cache)
    .sort(([, a], [, b]) => b.savedAt - a.savedAt)
    .slice(0, 100);

  writeCache(Object.fromEntries(entries));
}

const inFlight = new Map<string, Promise<FreightEstimate | null>>();

async function requestEstimate(
  cep: string,
  weight: number,
  width: number,
  length: number,
  height: number,
): Promise<FreightEstimate | null> {
  const key = getCacheKey(cep, weight, width, length, height);

  const cached = readCachedEstimate(key);

  if (cached !== undefined) {
    return cached;
  }

  const running = inFlight.get(key);

  if (running) {
    return running;
  }

  const promise = (async () => {
    try {
      const response = await fetch("/api/frete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: CEP_ORIGEM,
          to: cep,
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

      const options = sortByPrice(data.services ?? []);

      const cheapest = options.find((option) =>
        Number.isFinite(getDisplayedPrice(option)),
      );

      const estimate = cheapest
        ? {
            price: getDisplayedPrice(cheapest),
            serviceName: getServiceName(cheapest),
            deadline: getDeadline(cheapest),
          }
        : null;

      saveCachedEstimate(key, estimate);

      return estimate;
    } catch {
      return null;
    } finally {
      inFlight.delete(key);
    }
  })();

  inFlight.set(key, promise);

  return promise;
}

export function FreightProvider({ children }: { children: ReactNode }) {
  const [cep, setCepState] = useState("");

  useEffect(() => {
    try {
      const saved = cleanCep(localStorage.getItem(CEP_STORAGE_KEY) ?? "");

      setCepState(isValidCep(saved) ? saved : "");
    } catch {
      setCepState("");
    }
  }, []);

  const setCep = useCallback((value: string) => {
    const cleaned = cleanCep(value);

    if (!isValidCep(cleaned)) {
      return false;
    }

    try {
      localStorage.setItem(CEP_STORAGE_KEY, cleaned);
    } catch {
      // Estado continua funcionando mesmo sem localStorage.
    }

    setCepState(cleaned);

    return true;
  }, []);

  const clearCep = useCallback(() => {
    try {
      localStorage.removeItem(CEP_STORAGE_KEY);
    } catch {}

    setCepState("");
  }, []);

  const value = useMemo(
    () => ({
      cep,
      setCep,
      clearCep,
    }),
    [cep, setCep, clearCep],
  );

  return (
    <FreightContext.Provider value={value}>{children}</FreightContext.Provider>
  );
}

export function useFreightCep() {
  const context = useContext(FreightContext);

  if (!context) {
    throw new Error("useFreightCep deve ser usado dentro de FreightProvider");
  }

  return context;
}

export function useFreightEstimate({
  weight,
  width,
  length,
  height,
}: {
  weight?: number;
  width?: number;
  length?: number;
  height?: number;
}) {
  const { cep } = useFreightCep();

  const [estimate, setEstimate] = useState<FreightEstimate | null>(null);

  const [loading, setLoading] = useState(false);

  const validPackage =
    typeof weight === "number" &&
    typeof width === "number" &&
    typeof length === "number" &&
    typeof height === "number" &&
    weight > 0 &&
    width > 0 &&
    length > 0 &&
    height > 0;

  useEffect(() => {
    let cancelled = false;

    setEstimate(null);

    if (!cep || !validPackage) {
      setLoading(false);
      return;
    }

    setLoading(true);

    requestEstimate(cep, weight!, width!, length!, height!).then((result) => {
      if (cancelled) {
        return;
      }

      setEstimate(result);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [cep, weight, width, length, height, validPackage]);

  return {
    cep,
    estimate,
    loading,
    hasCep: Boolean(cep),
  };
}

/**
 * Calcula o frete de todos os produtos do carrinho.
 *
 * O valor de cada frete é multiplicado pela quantidade
 * daquele produto e depois todos os fretes são somados.
 */
export function useCartFreight(
  packages: CartFreightPackage[],
): CartFreightResult {
  const { cep } = useFreightCep();

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const packagesKey = JSON.stringify(packages);

  useEffect(() => {
    let cancelled = false;

    if (!cep) {
      setTotal(0);
      setLoading(false);
      setUnavailable(false);
      return;
    }

    if (packages.length === 0) {
      setTotal(0);
      setLoading(false);
      setUnavailable(false);
      return;
    }

    setLoading(true);
    setUnavailable(false);
    Promise.all(
      packages.map(async (item) => {
        const estimate = await requestEstimate(
          cep,
          item.weight,
          item.width,
          item.length,
          item.height,
        );

        if (!estimate) {
          return {
            value: 0,
            unavailable: true,
          };
        }

        return {
          value: estimate.price * item.quantity,
          unavailable: false,
        };
      }),
    ).then((results) => {
      if (cancelled) {
        return;
      }

      const hasUnavailable = results.some((result) => result.unavailable);

      const freightTotal = results.reduce(
        (sum, result) => sum + result.value,
        0,
      );

      setTotal(Number(freightTotal.toFixed(2)));
      setUnavailable(hasUnavailable);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [cep, packagesKey]);

  return {
    total,
    loading,
    hasCep: Boolean(cep),
    unavailable,
  };
}

export function formatStoredCep(value: string) {
  const digits = cleanCep(value);

  if (digits.length <= 5) {
    return digits;
  }

  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function formatFreightPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
