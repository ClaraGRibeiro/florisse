"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { formatColor, formatPath } from "@/utils/format";

type ProductPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default function ProductPage({ params }: ProductPageProps) {
    const { products } = useProducts();
    const { addToCart } = useCart();

    const router = useRouter();

    const [slug, setSlug] = useState<string | null>(null);

    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedImage, setSelectedImage] = useState(0);

    const [images, setImages] = useState<string[]>([]);
    const [added, setAdded] = useState(false);

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
                const suffix = index === 1 ? "" : `-${index}`;

                const path = `${basePath}${suffix}.webp`;

                const exists = await new Promise<boolean>((resolve) => {
                    const img = new window.Image();

                    img.onload = () => resolve(true);
                    img.onerror = () => resolve(false);

                    img.src = path;
                });

                // Achou o primeiro arquivo que não existe.
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
    }, [product, selectedColor]);

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
            <main className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        Produto não encontrado
                    </h1>

                    <button
                        onClick={() => router.push("/")}
                        className="mt-6 cursor-pointer rounded-2xl bg-primary px-6 py-3 font-semibold text-white"
                    >
                        Voltar para produtos
                    </button>
                </div>
            </main>
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

    const getGradient = (colors: string[]) => {
        if (colors.length === 1) {
            return colors[0];
        }

        if (colors.length === 2) {
            return `linear-gradient(
                135deg,
                ${colors[0]} 0%,
                ${colors[0]} 50%,
                ${colors[1]} 50%,
                ${colors[1]} 100%
            )`;
        }

        return `linear-gradient(135deg, ${colors.join(", ")})`;
    };

    // ============================================================
    // TROCA DE COR
    // ============================================================

    const handleColorChange = (index: number) => {
        setSelectedColor(index);
        setSelectedImage(0);
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
            prev === images.length - 1 ? 0 : prev + 1,
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
            prev === 0 ? images.length - 1 : prev - 1,
        );
    };

    // ============================================================
    // ADICIONAR AO CARRINHO
    // ============================================================

    const handleAdd = () => {
        if (!imageSrc) {
            return;
        }

        addToCart({
            id: crypto.randomUUID(),
            name: product.name,
            color: currentColor.name,
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
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">

                {/* ================================================= */}
                {/* VOLTAR */}
                {/* ================================================= */}

                <button
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

                    <div className="relative w-full max-w-180 md:max-w-150">

                        <div className="relative aspect-9/12 w-full overflow-hidden rounded-3xl bg-card-soft">

                            {/* IMAGEM PRINCIPAL */}

                            {imageSrc && (
                                <Image
                                    key={imageSrc}
                                    src={imageSrc}
                                    alt={`${product.name} - ${formatColor(
                                        currentColor.name,
                                    )}`}
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
                                    onClick={previousImage}
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
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() =>
                                                setSelectedImage(index)
                                            }
                                            aria-label={`Ver imagem ${
                                                index + 1
                                            }`}
                                            className={`h-2.5 w-2.5 cursor-pointer rounded-full transition-all ${
                                                selectedImage === index
                                                    ? "scale-125 bg-primary"
                                                    : "bg-foreground/40 hover:bg-foreground/70"
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* ================================================= */}
                            {/* BADGES */}
                            {/* ================================================= */}

                            <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">

                                {currentSize.sales !== undefined &&
                                    currentSize.sales > 0 && (
                                        <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-md backdrop-blur">
                                            {currentSize.sales > 1
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
                                {selectedImage + 1} / {images.length}
                            </p>
                        )}
                    </div>

                    {/* ================================================= */}
                    {/* INFORMAÇÕES */}
                    {/* ================================================= */}

                    <div className="flex min-w-0 flex-col pt-1 md:pt-4">

                        {/* CATEGORIA */}

                        <p className="text-sm font-medium text-primary">
                            {product.category}
                        </p>

                        {/* NOME */}

                        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
                            {product.name}
                        </h1>

                        {/* PREÇO */}

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <span className="text-3xl font-bold text-primary">
                                R$ {currentSize.price.toFixed(2)}
                            </span>

                            {currentSize.no_discount && (
                                <span className="text-sm text-muted line-through">
                                    R$ {currentSize.no_discount}
                                </span>
                            )}
                        </div>

                        {/* DIVISÓRIA */}

                        <div className="my-7 h-px bg-border" />

                        {/* ================================================= */}
                        {/* CORES */}
                        {/* ================================================= */}

                        <div>
                            <p className="mb-3 text-sm font-medium">
                                Escolha a cor:
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {product.colors.map((color, index) => (
                                    <button
                                        key={color.name}
                                        onClick={() =>
                                            handleColorChange(index)
                                        }
                                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${
                                            selectedColor === index
                                                ? "border-primary bg-primary text-white shadow-md"
                                                : "border-border bg-background hover:border-primary/40"
                                        }`}
                                    >
                                        <span
                                            className="h-5 w-5 shrink-0 rounded-full border border-white"
                                            style={{
                                                background: getGradient(
                                                    color.hex,
                                                ),
                                            }}
                                        />

                                        {formatColor(color.name)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ================================================= */}
                        {/* TAMANHOS */}
                        {/* ================================================= */}

                        <div className="mt-7">
                            <p className="mb-3 text-sm font-medium">
                                Escolha o tamanho:
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size, index) => (
                                    <button
                                        key={size.label}
                                        onClick={() =>
                                            handleSizeChange(index)
                                        }
                                        className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all ${
                                            selectedSize === index
                                                ? "border-primary bg-primary text-white shadow-md"
                                                : "border-border bg-background hover:border-primary/40"
                                        }`}
                                    >
                                        <span>{size.label}</span>

                                        {size.no_discount && (
                                            <span
                                                className={
                                                    selectedSize === index
                                                        ? "text-[10px] font-bold text-white/80"
                                                        : "text-[10px] font-bold text-red-500"
                                                }
                                            >
                                                -10%
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ================================================= */}
                        {/* COMPRA */}
                        {/* ================================================= */}

                        <div className="mt-8">
                            <button
                                onClick={handleAdd}
                                disabled={!imageSrc}
                                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-4 text-base font-semibold text-primary-foreground shadow-xl transition ${
                                    added
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
        </main>
    );
}