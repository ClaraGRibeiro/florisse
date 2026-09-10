"use client";

import { useState } from "react";
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

    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [added, setAdded] = useState(false);

    const [slug, setSlug] = useState<string | null>(null);

    // Carrega o slug
    useState(() => {
        params.then((value) => setSlug(value.slug));
    });

    if (!slug) {
        return null;
    }

    const product = products.find(
        (item) => formatPath(item.name) === slug,
    );

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

    const currentColor = product.colors[selectedColor];
    const currentSize = product.sizes[selectedSize];

    const imageSrc = `/products/${formatPath(
        product.category,
    )}/${formatPath(product.name)}/${currentColor.name}.webp`;

    const getGradient = (colors: string[]) => {
        if (colors.length === 1) return colors[0];

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

    const handleAdd = () => {
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

        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
                {/* VOLTAR */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex cursor-pointer items-center gap-2 text-sm font-medium text-muted transition hover:text-primary"
                >
                    <FaArrowLeft size={13} />
                    Voltar
                </button>

                {/* PRODUTO */}
                <div className="grid items-start gap-10 md:grid-cols-[minmax(0,600px)_minmax(320px,1fr)] lg:gap-16">

                    {/* IMAGEM */}
                    <div className="relative w-full max-w-[800px]">
                        <div className="relative aspect-9/16 w-full overflow-hidden rounded-3xl bg-card-soft">
                            <Image
                                key={currentColor.name}
                                src={imageSrc}
                                alt={`${product.name} - ${formatColor(
                                    currentColor.name,
                                )}`}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 600px"
                                className="object-cover"
                            />

                            {/* BADGES */}
                            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
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
                    </div>

                    {/* INFORMAÇÕES */}
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

                        {/* CORES */}
                        <div>
                            <p className="mb-3 text-sm font-medium">
                                Escolha a cor:
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {product.colors.map((color, index) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(index)}
                                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${selectedColor === index
                                            ? "border-primary bg-primary text-white shadow-md"
                                            : "border-border bg-background hover:border-primary/40"
                                            }`}
                                    >
                                        <span
                                            className="h-5 w-5 shrink-0 rounded-full border border-white"
                                            style={{
                                                background: getGradient(color.hex),
                                            }}
                                        />

                                        {formatColor(color.name)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* TAMANHOS */}
                        <div className="mt-7">
                            <p className="mb-3 text-sm font-medium">
                                Escolha o tamanho:
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size, index) => (
                                    <button
                                        key={size.label}
                                        onClick={() => setSelectedSize(index)}
                                        className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all ${selectedSize === index
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

                        {/* COMPRA */}
                        <div className="mt-8">
                            <button
                                onClick={handleAdd}
                                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-4 text-base font-semibold text-primary-foreground shadow-xl transition ${added
                                    ? "scale-[1.02] bg-secondary"
                                    : "bg-primary hover:scale-[1.01] hover:bg-primary-hover"
                                    }`}
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