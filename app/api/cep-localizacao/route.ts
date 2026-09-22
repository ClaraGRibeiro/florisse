import { NextRequest, NextResponse } from "next/server";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse";

function isValidCoordinate(value: unknown, min: number, max: number) {
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max;
}

function cleanCep(value: string) {
  return value.replace(/\D/g, "").slice(0, 8);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      latitude?: unknown;
      longitude?: unknown;
    };

    const latitude = Number(body.latitude);
    const longitude = Number(body.longitude);

    if (
      !isValidCoordinate(latitude, -90, 90) ||
      !isValidCoordinate(longitude, -180, 180)
    ) {
      return NextResponse.json(
        { error: "Coordenadas inválidas." },
        { status: 400 },
      );
    }

    const url = new URL(NOMINATIM_URL);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("lat", String(latitude));
    url.searchParams.set("lon", String(longitude));
    url.searchParams.set("zoom", "18");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("layer", "address");
    url.searchParams.set("accept-language", "pt-BR");

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Florisse-Croche/1.0 (+https://florisse.vercel.app)",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Não foi possível identificar o CEP pela localização." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      address?: {
        postcode?: string;
        country_code?: string;
      };
    };

    const cep = cleanCep(data.address?.postcode ?? "");

    // Só usamos o resultado automaticamente se for um CEP brasileiro válido.
    if (data.address?.country_code !== "br" || !/^\d{8}$/.test(cep)) {
      return NextResponse.json(
        {
          error:
            "Não foi possível encontrar um CEP brasileiro para essa localização.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ cep });
  } catch (error) {
    console.error("Erro ao obter CEP pela localização:", error);

    return NextResponse.json(
      { error: "Não foi possível identificar o CEP pela localização." },
      { status: 500 },
    );
  }
}
