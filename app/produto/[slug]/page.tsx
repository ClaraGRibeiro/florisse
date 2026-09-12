"use client";

import colorsData from "@/data/colors.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft, FaCheck, FaSearch, FaTimes } from "react-icons/fa";

import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { formatColor, formatPath } from "@/utils/format";

interface Color {
    name: string;
    hex: string;
}

const colors = colorsData as Color[];

type ProductPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default function ProductPage({ params }: ProductPageProps) {
    const { products } = useProducts();
    const { addToCart } = useCart();

    const router = useRouter();

    // ============================================================
    // ESTADOS
    // ============================================================

    const [slug, setSlug] = useState<string | null>(null);

    // Cor que possui foto
    const [selectedColor, setSelectedColor] = useState(0);

    // Tamanho
    const [selectedSize, setSelectedSize] = useState(0);

    // Imagem
    const [selectedImage, setSelectedImage] = useState(0);

    // Imagens da cor atual
    const [images, setImages] = useState<string[]>([]);

    // Feedback do botão de adicionar
    const [added, setAdded] = useState(false);

    // ============================================================
    // OUTRA COR
    // ============================================================

    // Indica se o cliente está escolhendo uma cor personalizada
    const [isOtherColor, setIsOtherColor] = useState(false);

    // Input de busca
    const [colorSearch, setColorSearch] = useState("");

    // Cores escolhidas pelo cliente
    const [selectedOtherColors, setSelectedOtherColors] =
        useState<string[]>([]);

    // ============================================================
    // CARREGA O SLUG
    // ============================================================

    useEffect(() => {
        params.then((value) => {
            setSlug(value.slug);
        });
    }, [params]);

    // ============================================================
    // ENCONTRA O PRODUTO
    // ============================================================

    const product = slug
        ? products.find(
            (item) => formatPath(item.name) === slug,
        )
        : undefined;

    // ============================================================
    // DESCOBRE AS IMAGENS DA COR
    // ============================================================

    useEffect(() => {
        if (!product) {
            return;
        }

        const currentColor = product.colors[selectedColor];

        if (!currentColor) {
            return;
        }

        let cancelled = false;

        const loadColorImages = async () => {
            const basePath = `/products/${formatPath(
                product.category,
            )}/${formatPath(product.name)}/${currentColor.name}`;

            const existingImages: string[] = [];

            let index = 1;

            while (!cancelled) {
                const suffix =
                    index === 1 ? "" : `-${index}`;

                const path = `${basePath}${suffix}.webp`;

                const exists = await new Promise<boolean>(
                    (resolve) => {
                        const img = new window.Image();

                        img.onload = () => resolve(true);
                        img.onerror = () => resolve(false);

                        img.src = path;
                    },
                );

                // Primeiro arquivo que não existe.
                // Para a busca.
                if (!exists) {
                    break;
                }

                existingImages.push(path);

                index++;
            }

            if (!cancelled) {
                setImages(existingImages);
                setSelectedImage(0);
            }
        };

        loadColorImages();

        return () => {
            cancelled = true;
        };
    }, [
        product?.category,
        product?.name,
        product?.colors[selectedColor]?.name,
    ]);

    // ============================================================
    // LOADING
    // ============================================================

    if (!slug || products.length === 0) {
        return null;
    }

    // ============================================================
    // PRODUTO NÃO ENCONTRADO
    // ============================================================

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        Produto não encontrado
                    </h1>

                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="mt-6 cursor-pointer rounded-2xl bg-primary px-6 py-3 font-semibold text-white"
                    >
                        Voltar para produtos
                    </button>
                </div>
            </div>
        );
    }

    // ============================================================
    // DADOS ATUAIS
    // ============================================================

    const currentColor = product.colors[selectedColor];
    const currentSize = product.sizes[selectedSize];

    const imageSrc = images[selectedImage];

    // ============================================================
    // GRADIENTE DAS CORES
    // ============================================================

    const getGradient = (colorHex: string[]) => {
        if (colorHex.length === 1) {
            return colorHex[0];
        }

        if (colorHex.length === 2) {
            return `linear-gradient(
                135deg,
                ${colorHex[0]} 0%,
                ${colorHex[0]} 50%,
                ${colorHex[1]} 50%,
                ${colorHex[1]} 100%
            )`;
        }

        return `linear-gradient(
            135deg,
            ${colorHex.join(", ")}
        )`;
    };

    // ============================================================
    // TROCA PARA UMA COR COM FOTO
    // ============================================================

    const handleColorChange = (index: number) => {
        // Sai do modo "Outra"
        setIsOtherColor(false);

        // Limpa as cores personalizadas
        setSelectedOtherColors([]);

        // Limpa o input
        setColorSearch("");

        // Seleciona a cor que possui foto
        setSelectedColor(index);

        // Volta para a primeira imagem
        setSelectedImage(0);
    };

    // ============================================================
    // ABRE "OUTRA"
    // ============================================================

    const handleOtherColorClick = () => {
        setIsOtherColor(true);

        // Não alteramos selectedColor.
        // Não alteramos selectedImage.
        //
        // Dessa forma, a imagem que já estava sendo exibida
        // continua na tela.
    };

    // ============================================================
    // BUSCA DE CORES
    // ============================================================

    const filteredColors = colors.filter((color) => {
        const search = colorSearch
            .trim()
            .toLowerCase();

        if (!search) {
            return false;
        }

        return color.name
            .toLowerCase()
            .includes(search);
    });

    // ============================================================
    // SELECIONA / REMOVE COR PERSONALIZADA
    // ============================================================

    const handleOtherColorChange = (
        colorName: string,
    ) => {
        setSelectedOtherColors((prev) => {
            // Se já está selecionada, remove
            if (prev.includes(colorName)) {
                return prev.filter(
                    (color) => color !== colorName,
                );
            }

            // Caso contrário, adiciona
            return [...prev, colorName];
        });

        // Limpa o campo depois da seleção
        setColorSearch("");
    };

    // ============================================================
    // REMOVE COR PERSONALIZADA
    // ============================================================

    const removeOtherColor = (colorName: string) => {
        setSelectedOtherColors((prev) =>
            prev.filter(
                (color) => color !== colorName,
            ),
        );
    };

    // ============================================================
    // TROCA DE TAMANHO
    // ============================================================

    const handleSizeChange = (index: number) => {
        setSelectedSize(index);
    };

    // ============================================================
    // PRÓXIMA IMAGEM
    // ============================================================

    const nextImage = () => {
        if (images.length <= 1) {
            return;
        }

        setSelectedImage((prev) =>
            prev === images.length - 1
                ? 0
                : prev + 1,
        );
    };

    // ============================================================
    // IMAGEM ANTERIOR
    // ============================================================

    const previousImage = () => {
        if (images.length <= 1) {
            return;
        }

        setSelectedImage((prev) =>
            prev === 0
                ? images.length - 1
                : prev - 1,
        );
    };

    // ============================================================
    // COR QUE SERÁ ENVIADA PARA O CARRINHO
    // ============================================================

    const cartColor = isOtherColor
        ? selectedOtherColors.join("/")
        : currentColor.name;

    // ============================================================
    // ADICIONAR AO CARRINHO
    // ============================================================

    const handleAdd = () => {
        // Não permite adicionar sem uma imagem
        if (!imageSrc) {
            return;
        }

        // Se estiver em "Outra", precisa ter pelo menos
        // uma cor escolhida.
        if (
            isOtherColor &&
            selectedOtherColors.length === 0
        ) {
            return;
        }

        addToCart({
            id: crypto.randomUUID(),
            name: product.name,
            color: cartColor,
            size: currentSize.label,
            price: currentSize.price,
            no_discount: currentSize.no_discount,
            image: imageSrc,
            quantity: 1,
        });

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">

                {/* ================================================= */}
                {/* VOLTAR */}
                {/* ================================================= */}

                <button
                    type="button"
                    onClick={() => router.back()}
                    className="mb-8 flex cursor-pointer items-center gap-2 text-sm font-medium text-muted transition hover:text-primary"
                >
                    <FaArrowLeft size={13} />
                    Voltar
                </button>

                {/* ================================================= */}
                {/* PRODUTO */}
                {/* ================================================= */}

                <div className="grid items-start gap-10 md:grid-cols-[minmax(0,600px)_minmax(320px,1fr)] lg:gap-16">

                    {/* ================================================= */}
                    {/* IMAGEM */}
                    {/* ================================================= */}

                    <div className="relative w-full max-w-180 md:max-w-120">

                        <div className="relative aspect-9/12 w-full overflow-hidden rounded-3xl bg-card-soft">

                            {/* ================================================= */}
                            {/* IMAGEM PRINCIPAL */}
                            {/* ================================================= */}

                            {imageSrc && (
                                <Image
                                    key={imageSrc}
                                    src={imageSrc}
                                    alt={`${product.name} - ${isOtherColor
                                            ? "cor personalizada"
                                            : formatColor(
                                                currentColor.name,
                                            )
                                        }`}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 600px"
                                    className="object-cover"
                                />
                            )}

                            {/* ================================================= */}
                            {/* SETA ESQUERDA */}
                            {/* ================================================= */}

                            {images.length > 1 && (
                                <button
                                    type="button"
                                    onClick={
                                        previousImage
                                    }
                                    aria-label="Imagem anterior"
                                    className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/80 text-2xl text-foreground shadow-md backdrop-blur transition hover:scale-105 hover:bg-background"
                                >
                                    ‹
                                </button>
                            )}

                            {/* ================================================= */}
                            {/* SETA DIREITA */}
                            {/* ================================================= */}

                            {images.length > 1 && (
                                <button
                                    type="button"
                                    onClick={nextImage}
                                    aria-label="Próxima imagem"
                                    className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/80 text-2xl text-foreground shadow-md backdrop-blur transition hover:scale-105 hover:bg-background"
                                >
                                    ›
                                </button>
                            )}

                            {/* ================================================= */}
                            {/* BOLINHAS */}
                            {/* ================================================= */}

                            {images.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-background/80 px-3 py-2 shadow-md backdrop-blur">
                                    {images.map(
                                        (_, index) => (
                                            <button
                                                key={
                                                    index
                                                }
                                                type="button"
                                                onClick={() =>
                                                    setSelectedImage(
                                                        index,
                                                    )
                                                }
                                                aria-label={`Ver imagem ${index +
                                                    1
                                                    }`}
                                                className={`h-2.5 w-2.5 cursor-pointer rounded-full transition-all ${selectedImage ===
                                                        index
                                                        ? "scale-125 bg-primary"
                                                        : "bg-foreground/40 hover:bg-foreground/70"
                                                    }`}
                                            />
                                        ),
                                    )}
                                </div>
                            )}

                            {/* ================================================= */}
                            {/* BADGES */}
                            {/* ================================================= */}

                            <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">

                                {currentSize.sales !==
                                    undefined &&
                                    currentSize.sales >
                                    0 && (
                                        <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-md backdrop-blur">
                                            {currentSize.sales >
                                                1
                                                ? `${currentSize.sales} vendidos`
                                                : `${currentSize.sales} vendido`}
                                        </span>
                                    )}

                                {currentSize.no_discount && (
                                    <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                                        -10%
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* ================================================= */}
                        {/* CONTADOR */}
                        {/* ================================================= */}

                        {images.length > 1 && (
                            <p className="mt-2 text-center text-xs text-muted">
                                {selectedImage + 1} /{" "}
                                {images.length}
                            </p>
                        )}
                    </div>

                    {/* ================================================= */}
                    {/* INFORMAÇÕES */}
                    {/* ================================================= */}

                    <div className="flex min-w-0 flex-col pt-1 md:pt-4">

                        {/* ================================================= */}
                        {/* CATEGORIA */}
                        {/* ================================================= */}

                        <p className="text-sm font-medium text-primary">
                            {product.category}
                        </p>

                        {/* ================================================= */}
                        {/* NOME */}
                        {/* ================================================= */}

                        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
                            {product.name}
                        </h1>

                        {/* ================================================= */}
                        {/* PREÇO */}
                        {/* ================================================= */}

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <span className="text-3xl font-bold text-primary">
                                R${" "}
                                {currentSize.price.toFixed(
                                    2,
                                )}
                            </span>

                            {currentSize.no_discount && (
                                <span className="text-sm text-muted line-through">
                                    R${" "}
                                    {
                                        currentSize.no_discount
                                    }
                                </span>
                            )}
                        </div>

                        {/* ================================================= */}
                        {/* DIVISÓRIA */}
                        {/* ================================================= */}

                        <div className="my-7 h-px bg-border" />

                        {/* ================================================= */}
                        {/* CORES */}
                        {/* ================================================= */}

                        <div>
                            <p className="mb-3 text-sm font-medium">
                                Escolha a cor:
                            </p>

                            <div className="flex flex-wrap gap-2">

                                {/* ================================================= */}
                                {/* CORES COM FOTO */}
                                {/* ================================================= */}

                                {product.colors.map(
                                    (color, index) => (
                                        <button
                                            key={
                                                color.name
                                            }
                                            type="button"
                                            onClick={() =>
                                                handleColorChange(
                                                    index,
                                                )
                                            }
                                            className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${!isOtherColor &&
                                                    selectedColor ===
                                                    index
                                                    ? "border-primary bg-primary text-white shadow-md"
                                                    : "border-border bg-background hover:border-primary/40"
                                                }`}
                                        >
                                            <span
                                                className="h-5 w-5 shrink-0 rounded-full border border-white"
                                                style={{
                                                    background:
                                                        getGradient(
                                                            color.hex,
                                                        ),
                                                }}
                                            />

                                            {formatColor(
                                                color.name,
                                            )}
                                        </button>
                                    ),
                                )}

                                {/* ================================================= */}
                                {/* OUTRA */}
                                {/* ================================================= */}

                                <button
                                    type="button"
                                    onClick={
                                        handleOtherColorClick
                                    }
                                    className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${isOtherColor
                                            ? "border-primary bg-primary text-white shadow-md"
                                            : "border-border bg-background hover:border-primary/40"
                                        }`}
                                >
                                    <span className="h-5 w-5 shrink-0 rounded-full border border-white bg-[#fbf6ee]" />

                                    {selectedOtherColors.length >
                                        0
                                        ? `Outra (${selectedOtherColors.length})`
                                        : "Outra"}
                                </button>
                            </div>

                            {/* ================================================= */}
                            {/* ÁREA DE OUTRA COR */}
                            {/* ================================================= */}

                            {isOtherColor && (
                                <div className="relative mt-3 w-full max-w-md">

                                    {/* ================================================= */}
                                    {/* INPUT */}
                                    {/* ================================================= */}

                                    <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 transition focus-within:border-primary">
                                        <FaSearch
                                            size={13}
                                            className="shrink-0 text-muted"
                                        />

                                        <input
                                            type="text"
                                            value={
                                                colorSearch
                                            }
                                            onChange={(event) =>
                                                setColorSearch(
                                                    event
                                                        .target
                                                        .value,
                                                )
                                            }
                                            placeholder="Digite uma cor..."
                                            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
                                        />

                                        {colorSearch && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setColorSearch(
                                                        "",
                                                    )
                                                }
                                                aria-label="Limpar busca"
                                                className="cursor-pointer text-muted transition hover:text-foreground"
                                            >
                                                <FaTimes
                                                    size={
                                                        13
                                                    }
                                                />
                                            </button>
                                        )}
                                    </div>

                                    {/* ================================================= */}
                                    {/* RESULTADOS DA BUSCA */}
                                    {/* ================================================= */}

                                    {colorSearch.trim() !==
                                        "" && (
                                            <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-border bg-background p-2 shadow-xl">

                                                {filteredColors.length >
                                                    0 ? (
                                                    filteredColors.map(
                                                        (
                                                            color,
                                                        ) => {
                                                            const isSelected =
                                                                selectedOtherColors.includes(
                                                                    color.name,
                                                                );

                                                            return (
                                                                <button
                                                                    key={
                                                                        color.name
                                                                    }
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleOtherColorChange(
                                                                            color.name,
                                                                        )
                                                                    }
                                                                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${isSelected
                                                                            ? "bg-primary text-white"
                                                                            : "hover:bg-primary/10"
                                                                        }`}
                                                                >
                                                                    {/* COR */}

                                                                    <span
                                                                        className="h-6 w-6 shrink-0 rounded-full border border-border"
                                                                        style={{
                                                                            background:
                                                                                color.hex,
                                                                        }}
                                                                    />

                                                                    {/* NOME */}

                                                                    <span className="flex-1">
                                                                        {formatColor(
                                                                            color.name,
                                                                        )}
                                                                    </span>

                                                                    {/* CHECK */}

                                                                    {isSelected && (
                                                                        <FaCheck
                                                                            size={
                                                                                12
                                                                            }
                                                                        />
                                                                    )}
                                                                </button>
                                                            );
                                                        },
                                                    )
                                                ) : (
                                                    <p className="px-3 py-3 text-sm text-muted">
                                                        Nenhuma cor
                                                        encontrada.
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                    {/* ================================================= */}
                                    {/* CORES SELECIONADAS */}
                                    {/* ================================================= */}

                                    {selectedOtherColors.length >
                                        0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">

                                                {selectedOtherColors.map(
                                                    (
                                                        colorName,
                                                    ) => {
                                                        const color =
                                                            colors.find(
                                                                (
                                                                    item,
                                                                ) =>
                                                                    item.name ===
                                                                    colorName,
                                                            );

                                                        if (
                                                            !color
                                                        ) {
                                                            return null;
                                                        }

                                                        return (
                                                            <button
                                                                key={
                                                                    colorName
                                                                }
                                                                type="button"
                                                                onClick={() =>
                                                                    removeOtherColor(
                                                                        colorName,
                                                                    )
                                                                }
                                                                className="flex cursor-pointer items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs text-primary transition hover:bg-primary/20"
                                                                title="Remover cor"
                                                            >
                                                                <span
                                                                    className="h-4 w-4 rounded-full border border-border"
                                                                    style={{
                                                                        background:
                                                                            color.hex,
                                                                    }}
                                                                />

                                                                {formatColor(
                                                                    colorName,
                                                                )}

                                                                <FaTimes
                                                                    size={
                                                                        9
                                                                    }
                                                                />
                                                            </button>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        )}

                                    {/* ================================================= */}
                                    {/* TEXTO EXPLICATIVO */}
                                    {/* ================================================= */}

                                    <p className="mt-2 text-xs text-muted">
                                        Você pode escolher
                                        uma ou mais cores.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* ================================================= */}
                        {/* TAMANHOS */}
                        {/* ================================================= */}

                        <div className="mt-7">
                            <p className="mb-3 text-sm font-medium">
                                Escolha o tamanho:
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map(
                                    (size, index) => (
                                        <button
                                            key={
                                                size.label
                                            }
                                            type="button"
                                            onClick={() =>
                                                handleSizeChange(
                                                    index,
                                                )
                                            }
                                            className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all ${selectedSize ===
                                                    index
                                                    ? "border-primary bg-primary text-white shadow-md"
                                                    : "border-border bg-background hover:border-primary/40"
                                                }`}
                                        >
                                            <span>
                                                {
                                                    size.label
                                                }
                                            </span>

                                            {size.no_discount && (
                                                <span
                                                    className={
                                                        selectedSize ===
                                                            index
                                                            ? "text-[10px] font-bold text-white/80"
                                                            : "text-[10px] font-bold text-red-500"
                                                    }
                                                >
                                                    -10%
                                                </span>
                                            )}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>

                        {/* ================================================= */}
                        {/* COMPRA */}
                        {/* ================================================= */}

                        <div className="mt-8">
                            <button
                                type="button"
                                onClick={handleAdd}
                                disabled={
                                    !imageSrc ||
                                    (isOtherColor &&
                                        selectedOtherColors.length ===
                                        0)
                                }
                                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-4 text-base font-semibold text-primary-foreground shadow-xl transition ${added
                                        ? "scale-[1.02] bg-secondary"
                                        : "bg-primary hover:scale-[1.01] hover:bg-primary-hover"
                                    } disabled:cursor-not-allowed disabled:opacity-50`}
                            >
                                {added ? (
                                    <>
                                        <FaCheck />
                                        Adicionado
                                    </>
                                ) : (
                                    "Adicionar ao carrinho"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}