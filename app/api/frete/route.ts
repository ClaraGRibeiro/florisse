import { BRAND } from "@/data/config";
import { NextRequest, NextResponse } from "next/server";

const SUPERFRETE_API_URL = "https://api.superfrete.com/api/v0/calculator";

type FreightRequest = {
  from: string;
  to: string;
  weight: number;
  height: number;
  width: number;
  length: number;
};

function cleanCep(value: string) {
  return value.replace(/\D/g, "");
}

function isValidCep(value: string) {
  return /^\d{8}$/.test(value);
}

function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function getErrorMessage(data: unknown) {
  if (!data || typeof data !== "object") {
    return null;
  }

  const object = data as Record<string, unknown>;

  const possibleMessages = [
    object.message,
    object.error,
    object.detail,
    object.description,
  ];

  for (const message of possibleMessages) {
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return null;
}

function normalizeServices(data: unknown) {
  if (Array.isArray(data)) {
    return data;
  }

  if (!data || typeof data !== "object") {
    return [];
  }

  const object = data as Record<string, unknown>;

  const possibleArrays = [
    object.services,
    object.data,
    object.results,
    object.quotes,
    object.shipping,
  ];

  for (const value of possibleArrays) {
    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
}

function addFreightMargin(price: unknown) {
  const value = Number(price);

  if (!Number.isFinite(value)) {
    return null;
  }

  return Number(value.toFixed(2));
}

function applyFreightMargin(service: unknown) {
  if (!service || typeof service !== "object") {
    return service;
  }

  const object = service as Record<string, unknown>;

  const price = object.custom_price ?? object.price ?? object.final_price;

  if (price === undefined || price === null) {
    return service;
  }

  const customPrice = addFreightMargin(price);

  if (customPrice === null) {
    return service;
  }

  return {
    ...object,
    custom_price: customPrice,
  };
}

export async function POST(request: NextRequest) {
  try {
    const token = process.env.SUPERFRETE_API_TOKEN;

    if (!token) {
      console.error("SUPERFRETE_API_TOKEN não configurado.");

      return NextResponse.json(
        {
          error: "O cálculo de frete ainda não está configurado.",
        },
        { status: 500 },
      );
    }

    const body = (await request.json()) as Partial<FreightRequest>;

    const from = cleanCep(String(body.from ?? ""));
    const to = cleanCep(String(body.to ?? ""));

    const weight = Number(body.weight);
    const height = Number(body.height);
    const width = Number(body.width);
    const length = Number(body.length);

    if (!isValidCep(from)) {
      return NextResponse.json(
        {
          error: "O CEP de origem é inválido.",
        },
        { status: 400 },
      );
    }

    if (!isValidCep(to)) {
      return NextResponse.json(
        {
          error: "Informe um CEP de destino válido.",
        },
        { status: 400 },
      );
    }

    if (
      !isPositiveNumber(weight) ||
      !isPositiveNumber(height) ||
      !isPositiveNumber(width) ||
      !isPositiveNumber(length)
    ) {
      return NextResponse.json(
        {
          error: "Peso e dimensões do pacote precisam ser válidos.",
        },
        { status: 400 },
      );
    }

    const superFreteBody = {
      from: {
        postal_code: from,
      },

      to: {
        postal_code: to,
      },

      services: "1,2,3,33",

      options: {
        own_hand: false,
        receipt: false,
        insurance_value: 0,
        use_insurance_value: false,
      },

      package: {
        weight,
        height,
        width,
        length,
      },
    };

    const response = await fetch(SUPERFRETE_API_URL, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": `Florisse-Croche (${BRAND})`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(superFreteBody),

      cache: "no-store",
    });

    const responseText = await response.text();

    let responseData: unknown = null;

    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseData = null;
    }

    if (!response.ok) {
      console.error(
        "Erro SuperFrete:",
        response.status,
        responseData ?? responseText,
      );

      const apiMessage = getErrorMessage(responseData);

      return NextResponse.json(
        {
          error:
            apiMessage || "Não foi possível calcular o frete para esse CEP.",
        },
        {
          status: response.status >= 400 && response.status < 500 ? 400 : 502,
        },
      );
    }

    const services = normalizeServices(responseData).map(applyFreightMargin);

    return NextResponse.json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("Erro interno ao calcular frete:", error);

    return NextResponse.json(
      {
        error: "Não foi possível calcular o frete agora. Tente novamente.",
      },
      { status: 500 },
    );
  }
}
