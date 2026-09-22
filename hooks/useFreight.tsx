"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { CEP_ORIGEM, FREIGHT, PACKAGE } from "@/data/config";

const CEP_STORAGE_KEY = "florisse-cep";
const FREIGHT_CACHE_KEY = "florisse-freight-cache";
const FREIGHT_SERVICE_STORAGE_KEY = "florisse-freight-service";
const CACHE_TTL = 1000 * 60 * 60 * 6;

const MAX_PACKAGE_WEIGHT = 30;
const MAX_PACKAGE_HEIGHT = 60;

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
  serviceId: string;
};

export type CartFreightOption = {
  id: string;
  name: string;
  price: number;
  deadline: string | null;
};

type FreightResponse = {
  success?: boolean;
  services?: FreightOption[];
  error?: string;
};

type FreightCacheEntry = {
  savedAt: number;
  estimates: FreightEstimate[];
};

type FreightCache = Record<string, FreightCacheEntry>;

type FreightContextType = {
  cep: string;
  setCep: (value: string) => boolean;
  clearCep: () => void;
  selectedServiceId: string | null;
  setSelectedServiceId: (value: string | null) => void;
};

export type CartFreightPackage = {
  id: string;
  quantity: number;
  weight: number;
  width: number;
  length: number;
  height: number;
};

type ShippingUnit = {
  id: string;
  weight: number;
  width: number;
  length: number;
  height: number;
};

type PhysicalPackage = {
  id: string;
  weight: number;
  width: number;
  length: number;
  height: number;
};

export type CartFreightResult = {
  total: number;
  loading: boolean;
  hasCep: boolean;
  unavailable: boolean;
  options: CartFreightOption[];
  selectedServiceId: string | null;
  setSelectedServiceId: (value: string | null) => void;
};

const FreightContext = createContext<FreightContextType | undefined>(
  undefined,
);

function cleanCep(value: string) {
  return value.replace(/\D/g, "").slice(0, 8);
}

function isValidCep(value: string) {
  return /^\d{8}$/.test(value);
}

function getServiceId(option: FreightOption) {
  const id = option.id ?? option.service;

  if (id !== undefined && id !== null && String(id).trim()) {
    return String(id);
  }

  return getServiceName(option).toLowerCase().trim().replace(/\s+/g, "-");
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
      return "SEDEX";
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

  return Number.isFinite(price)
    ? Number((price * FREIGHT).toFixed(2))
    : Infinity;
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

function readCachedEstimates(
  key: string,
): FreightEstimate[] | null | undefined {
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

  return Array.isArray(entry.estimates) ? entry.estimates : null;
}

function saveCachedEstimates(key: string, estimates: FreightEstimate[]) {
  const cache = readCache();

  cache[key] = {
    savedAt: Date.now(),
    estimates,
  };

  const entries = Object.entries(cache)
    .sort(([, a], [, b]) => b.savedAt - a.savedAt)
    .slice(0, 100);

  writeCache(Object.fromEntries(entries));
}

const inFlight = new Map<string, Promise<FreightEstimate[]>>();

async function requestEstimates(
  cep: string,
  weight: number,
  width: number,
  length: number,
  height: number,
): Promise<FreightEstimate[]> {
  const key = getCacheKey(cep, weight, width, length, height);

  const cached = readCachedEstimates(key);

  if (cached !== undefined) {
    return cached ?? [];
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

      const estimates = sortByPrice(data.services ?? [])
        .map((option) => {
          const price = getDisplayedPrice(option);

          if (!Number.isFinite(price)) {
            return null;
          }

          return {
            price,
            serviceName: getServiceName(option),
            deadline: getDeadline(option),
            serviceId: getServiceId(option),
          };
        })
        .filter((estimate): estimate is FreightEstimate => estimate !== null);

      saveCachedEstimates(key, estimates);

      return estimates;
    } catch {
      return [];
    } finally {
      inFlight.delete(key);
    }
  })();

  inFlight.set(key, promise);

  return promise;
}

async function getCepFromCurrentLocation(): Promise<string | null> {
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    return null;
  }

  const position = await new Promise<GeolocationPosition | null>((resolve) => {
    navigator.geolocation.getCurrentPosition(resolve, () => resolve(null), {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 10 * 60 * 1000,
    });
  });

  if (!position) {
    return null;
  }

  try {
    const response = await fetch("/api/cep-localizacao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { cep?: string };
    const cep = cleanCep(data.cep ?? "");

    return isValidCep(cep) ? cep : null;
  } catch {
    return null;
  }
}

export function FreightProvider({ children }: { children: ReactNode }) {
  const [cep, setCepState] = useState("");
  const [selectedServiceId, setSelectedServiceIdState] = useState<
    string | null
  >(null);

  const cepSetManuallyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    try {
      const savedService = localStorage.getItem(FREIGHT_SERVICE_STORAGE_KEY);

      if (savedService) {
        setSelectedServiceIdState(savedService);
      }
    } catch {
      // Estado continua funcionando sem localStorage.
    }

    async function initializeCep() {
      try {
        const saved = cleanCep(localStorage.getItem(CEP_STORAGE_KEY) ?? "");

        if (isValidCep(saved)) {
          setCepState(saved);
          return;
        }

        const detectedCep = await getCepFromCurrentLocation();

        if (cancelled || !detectedCep || cepSetManuallyRef.current) {
          return;
        }

        const currentSavedCep = cleanCep(
          localStorage.getItem(CEP_STORAGE_KEY) ?? "",
        );

        if (isValidCep(currentSavedCep)) {
          return;
        }

        localStorage.setItem(CEP_STORAGE_KEY, detectedCep);
        setCepState(detectedCep);
      } catch {
        // CEP pode ser informado manualmente pelo modal.
      }
    }

    void initializeCep();

    return () => {
      cancelled = true;
    };
  }, []);

  const setCep = useCallback((value: string) => {
    const cleaned = cleanCep(value);

    if (!isValidCep(cleaned)) {
      return false;
    }

    cepSetManuallyRef.current = true;

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

  const setSelectedServiceId = useCallback((value: string | null) => {
    setSelectedServiceIdState(value);

    try {
      if (value) {
        localStorage.setItem(FREIGHT_SERVICE_STORAGE_KEY, value);
      } else {
        localStorage.removeItem(FREIGHT_SERVICE_STORAGE_KEY);
      }
    } catch {
      // Estado continua funcionando sem localStorage.
    }
  }, []);

  const value = useMemo(
    () => ({
      cep,
      setCep,
      clearCep,
      selectedServiceId,
      setSelectedServiceId,
    }),
    [cep, setCep, clearCep, selectedServiceId, setSelectedServiceId],
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

    requestEstimates(cep, weight!, width!, length!, height!).then((options) => {
      if (cancelled) {
        return;
      }

      setEstimate(options[0] ?? null);
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

function getProductWeight(weight: number) {
  return Math.max(0, weight - PACKAGE);
}

function createShippingUnits(
  packages: CartFreightPackage[],
): ShippingUnit[] {
  const units: ShippingUnit[] = [];

  for (const item of packages) {
    const quantity = Math.max(0, Math.floor(item.quantity));

    if (quantity === 0) {
      continue;
    }

    const unitWeight = getProductWeight(item.weight);

    for (let index = 0; index < quantity; index += 1) {
      units.push({
        id: `${item.id}-${index + 1}`,
        weight: unitWeight,
        width: item.width,
        length: item.length,
        height: item.height,
      });
    }
  }

  return units;
}

function getVolume(unit: ShippingUnit) {
  return unit.width * unit.length * unit.height;
}

function sortShippingUnits(units: ShippingUnit[]) {
  return [...units].sort((a, b) => {
    const volumeDifference = getVolume(b) - getVolume(a);

    if (volumeDifference !== 0) {
      return volumeDifference;
    }

    return b.weight - a.weight;
  });
}

function canAddToPackage(current: PhysicalPackage, unit: ShippingUnit) {
  const nextWeight = current.weight + unit.weight;
  const nextWidth = Math.max(current.width, unit.width);
  const nextLength = Math.max(current.length, unit.length);
  const nextHeight = current.height + unit.height;

  return (
    nextWeight <= MAX_PACKAGE_WEIGHT &&
    nextWidth > 0 &&
    nextLength > 0 &&
    nextHeight <= MAX_PACKAGE_HEIGHT
  );
}

function addUnitToPackage(
  current: PhysicalPackage,
  unit: ShippingUnit,
): PhysicalPackage {
  return {
    id: current.id,
    weight: Number((current.weight + unit.weight).toFixed(3)),
    width: Math.max(current.width, unit.width),
    length: Math.max(current.length, unit.length),
    height: Number((current.height + unit.height).toFixed(1)),
  };
}

function buildPhysicalPackages(
  packages: CartFreightPackage[],
): PhysicalPackage[] {
  const units = sortShippingUnits(createShippingUnits(packages));
  const physicalPackages: PhysicalPackage[] = [];

  for (const unit of units) {
    const possiblePackages = physicalPackages
      .map((physicalPackage, index) => ({
        physicalPackage,
        index,
      }))
      .filter(({ physicalPackage }) =>
        canAddToPackage(physicalPackage, unit),
      )
      .sort((a, b) => {
        const heightA = a.physicalPackage.height + unit.height;
        const heightB = b.physicalPackage.height + unit.height;

        return heightA - heightB;
      });

    if (possiblePackages.length > 0) {
      const target = possiblePackages[0];

      physicalPackages[target.index] = addUnitToPackage(
        target.physicalPackage,
        unit,
      );
      continue;
    }

    physicalPackages.push({
      id: `package-${physicalPackages.length + 1}`,
      weight: unit.weight,
      width: unit.width,
      length: unit.length,
      height: unit.height,
    });
  }

  return physicalPackages.map((physicalPackage) => ({
    ...physicalPackage,
    weight: Number((physicalPackage.weight + PACKAGE).toFixed(3)),
  }));
}

function combinePackageOptions(
  packageOptions: FreightEstimate[][],
): CartFreightOption[] {
  if (packageOptions.length === 0) {
    return [];
  }

  /*
   * Um serviço só aparece para escolha se estiver disponível
   * em TODOS os pacotes físicos do pedido. Assim, o cliente
   * escolhe uma única transportadora/serviço para o pedido
   * inteiro e não corre o risco de selecionar um serviço que
   * só atende uma parte do carrinho.
   */
  const commonIds = new Set(
    packageOptions[0].map((option) => option.serviceId),
  );

  for (const options of packageOptions.slice(1)) {
    const ids = new Set(options.map((option) => option.serviceId));

    for (const id of [...commonIds]) {
      if (!ids.has(id)) {
        commonIds.delete(id);
      }
    }
  }

  const result: CartFreightOption[] = [];

  for (const serviceId of commonIds) {
    let total = 0;
    let representative: FreightEstimate | null = null;
    let valid = true;

    for (const options of packageOptions) {
      const option = options.find((item) => item.serviceId === serviceId);

      if (!option) {
        valid = false;
        break;
      }

      total += option.price;

      if (!representative) {
        representative = option;
      }
    }

    if (valid && representative) {
      result.push({
        id: serviceId,
        name: representative.serviceName,
        price: Number(total.toFixed(2)),
        deadline: representative.deadline,
      });
    }
  }

  return result.sort((a, b) => a.price - b.price);
}

export function useCartFreight(
  packages: CartFreightPackage[],
): CartFreightResult {
  const {
    cep,
    selectedServiceId: contextSelectedServiceId,
    setSelectedServiceId,
  } = useFreightCep();

  const [options, setOptions] = useState<CartFreightOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const packagesKey = JSON.stringify(packages);

  useEffect(() => {
    let cancelled = false;

    if (!cep || packages.length === 0) {
      setOptions([]);
      setLoading(false);
      setUnavailable(false);
      return;
    }

    setLoading(true);
    setUnavailable(false);

    const physicalPackages = buildPhysicalPackages(packages);

    Promise.all(
      physicalPackages.map((physicalPackage) =>
        requestEstimates(
          cep,
          physicalPackage.weight,
          physicalPackage.width,
          physicalPackage.length,
          physicalPackage.height,
        ),
      ),
    ).then((packageOptions) => {
      if (cancelled) {
        return;
      }

      const combinedOptions = combinePackageOptions(packageOptions);

      setOptions(combinedOptions);
      setUnavailable(combinedOptions.length === 0);
      setLoading(false);

      /*
       * Se o serviço salvo ainda existir para este carrinho,
       * mantemos a escolha. Caso contrário, usamos o serviço
       * mais barato apenas como seleção inicial.
       */
      const currentStillAvailable = combinedOptions.some(
        (option) => option.id === contextSelectedServiceId,
      );

      if (currentStillAvailable) {
        return;
      }

      setSelectedServiceId(combinedOptions[0]?.id ?? null);
    });

    return () => {
      cancelled = true;
    };
  }, [cep, packagesKey, contextSelectedServiceId, setSelectedServiceId]);

  const selectedOption =
    options.find((option) => option.id === contextSelectedServiceId) ?? null;

  return {
    total: selectedOption?.price ?? 0,
    loading,
    hasCep: Boolean(cep),
    unavailable,
    options,
    selectedServiceId: selectedOption?.id ?? null,
    setSelectedServiceId,
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
