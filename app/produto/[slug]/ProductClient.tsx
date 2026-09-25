"use client";

import colorsData from "@/data/colors.json";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowUp, FaPalette, FaPinterest } from "react-icons/fa";

import { useCart } from "@/hooks/useCart";
import { useScrollTop } from "@/hooks/useScrollTop";
import { getProductBySlug, getProducts } from "@/lib/products";

import { Color } from "@/types/color";

import MiniCart from "@/components/cart/MiniCart";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductRelated from "@/components/product/ProductRelated";
import Share from "@/components/product/Share";

import { formatColor } from "@/utils/format";
import Link from "next/link";
import { motion } from "framer-motion";

const colors = colorsData as Color[];

type ProductClientProps = {
  slug: string;
};

type AddedItem = {
  name: string;
  image: string;
  color: string;
  size: string;
};

export default function ProductClient({ slug }: ProductClientProps) {
  const router = useRouter();

  const { showTop, scrollToTop } = useScrollTop();

  const products = getProducts();
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(0);

  const [selectedSize, setSelectedSize] = useState(0);

  const [isCustomSize, setIsCustomSize] = useState(false);

  const [customLength, setCustomLength] = useState("");

  const [customWidth, setCustomWidth] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);

  const [added, setAdded] = useState(false);

  const [isOtherColor, setIsOtherColor] = useState(false);

  const [colorSearch, setColorSearch] = useState("");

  const [selectedOtherColors, setSelectedOtherColors] = useState<string[]>([]);

  const [miniCartOpen, setMiniCartOpen] = useState(false);

  const [addedItem, setAddedItem] = useState<AddedItem | null>(null);

  const addedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const product = getProductBySlug(slug);

  const currentColor = product?.colors[selectedColor];

  const currentColorName =
    typeof currentColor === "string" ? currentColor : currentColor?.name;

  const images =
    product && currentColorName
      ? (product.images?.[currentColorName] ?? [])
      : [];

  useEffect(() => {
    return () => {
      if (addedTimeout.current) {
        clearTimeout(addedTimeout.current);
      }
    };
  }, []);

  if (products.length === 0) {
    return null;
  }

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-foreground font-serif text-3xl font-semibold">
            Peça não encontrada
          </h1>

          <p className="text-muted mt-3 text-sm">
            Não encontramos o produto que você está procurando.
          </p>

          <button
            type="button"
            onClick={() => router.push("/#produtos")}
            className="bg-primary text-primary-foreground mt-6 cursor-pointer rounded-full px-6 py-3 text-sm font-semibold transition-all hover:opacity-90"
          >
            Ver produtos
          </button>
        </div>
      </main>
    );
  }

  if (!currentColor) {
    return null;
  }

  const currentSize = product.sizes[selectedSize];
  if (!currentSize) {
    return null;
  }

  const imageSrc = images[selectedImage]?.url ?? "";
  const cartSize = isCustomSize ? "Outro" : currentSize.label;

  const cartColor = isOtherColor
    ? selectedOtherColors.join("/")
    : typeof currentColor === "string"
      ? currentColor
      : currentColor.name;

  const canAddToCart =
    Boolean(imageSrc) &&
    (!isOtherColor || selectedOtherColors.length > 0) &&
    (!isCustomSize ||
      (customLength.trim().length > 0 && customWidth.trim().length > 0));

  const handleColorChange = (index: number) => {
    setSelectedColor(index);

    setIsOtherColor(false);
    setColorSearch("");
    setSelectedOtherColors([]);

    setSelectedImage(0);
  };

  const handleOtherColorClick = () => {
    setIsOtherColor((previous) => !previous);

    setColorSearch("");
    setSelectedOtherColors([]);

    setSelectedImage(0);
  };

  const handleOtherColorChange = (colorName: string) => {
    setSelectedOtherColors((previous) => {
      if (previous.includes(colorName)) {
        return previous.filter((name) => name !== colorName);
      }

      return [...previous, colorName];
    });

    setColorSearch("");
  };

  const removeOtherColor = (colorName: string) => {
    setSelectedOtherColors((previous) =>
      previous.filter((name) => name !== colorName),
    );
  };

  const handleSizeChange = (index: number) => {
    setSelectedSize(index);

    setIsCustomSize(false);
    setCustomLength("");
    setCustomWidth("");
  };

  const handleCustomSizeClick = () => {
    setIsCustomSize((previous) => !previous);

    if (!isCustomSize) {
      setCustomLength("");
      setCustomWidth("");
    }
  };

  const nextImage = () => {
    if (images.length <= 1) {
      return;
    }

    setSelectedImage((previous) => (previous + 1) % images.length);
  };

  const previousImage = () => {
    if (images.length <= 1) {
      return;
    }

    setSelectedImage(
      (previous) => (previous - 1 + images.length) % images.length,
    );
  };

  const handleAdd = () => {
    if (!canAddToCart) {
      return;
    }

    const miniCartItem: AddedItem = {
      name: product.name,
      image: imageSrc,
      color: formatColor(cartColor),
      size: isCustomSize
        ? `${customLength} × ${customWidth} cm`
        : currentSize.label,
    };

    addToCart({
      id: crypto.randomUUID(),
      name: product.name,
      type: isCustomSize ? "custom-order" : "product",
      color: cartColor,
      size: cartSize,
      customLength: isCustomSize ? customLength : undefined,
      customWidth: isCustomSize ? customWidth : undefined,

      price: isCustomSize ? 0 : currentSize.price,

      no_discount: isCustomSize ? undefined : currentSize.no_discount,

      image: imageSrc,
      quantity: 1,
    });

    setAddedItem(miniCartItem);
    setMiniCartOpen(true);

    setAdded(true);

    if (addedTimeout.current) {
      clearTimeout(addedTimeout.current);
    }

    addedTimeout.current = setTimeout(() => {
      setAdded(false);
      addedTimeout.current = null;
    }, 600);
  };

  return (
    <main className="bg-background min-h-screen scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 pt-2 pb-16 sm:px-6 lg:px-8">
        {addedItem && (
          <MiniCart
            isOpen={miniCartOpen}
            name={addedItem.name}
            image={addedItem.image}
            color={addedItem.color}
            size={addedItem.size}
            onClose={() => setMiniCartOpen(false)}
          />
        )}
        <div className="mb-2 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="group text-muted hover:bg-muted/10 hover:text-primary flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors"
          >
            <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />

            <span>Voltar</span>
          </button>

          <Share product={product} />
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-16 xl:gap-20">
          <div>
            <ProductGallery
              productName={product.name}
              imageSrc={imageSrc}
              images={images}
              selectedImage={selectedImage}
              totalSales={product.total_sales ?? 0}
              currentPrice={currentSize.price}
              originalPrice={
                currentSize.no_discount
                  ? Number(currentSize.no_discount)
                  : undefined
              }
              onPreviousImage={previousImage}
              onNextImage={nextImage}
              onSelectImage={setSelectedImage}
            />

            {isOtherColor && (
              <div className="border-primary/15 bg-primary/5 mt-4 flex items-start gap-3 rounded-2xl border px-4 py-3.5">
                <div className="text-primary mt-0.5 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v4m0 4h.01M10.29 3.86l-8.1 14a2 2 0 001.73 2.64h16.16a2 2 0 001.73-2.64l-8.1-14a2 2 0 00-3.42 0z"
                    />
                  </svg>
                </div>

                <p className="text-muted text-sm leading-relaxed">
                  <span className="text-foreground font-semibold">
                    A imagem é ilustrativa.
                  </span>{" "}
                  A peça será produzida nas cores escolhidas.
                </p>
              </div>
            )}
          </div>

          <ProductInfo
            product={product}
            colors={colors}
            selectedColor={selectedColor}
            isOtherColor={isOtherColor}
            colorSearch={colorSearch}
            selectedOtherColors={selectedOtherColors}
            selectedSize={selectedSize}
            isCustomSize={isCustomSize}
            customLength={customLength}
            customWidth={customWidth}
            canAddToCart={canAddToCart}
            added={added}
            onColorChange={handleColorChange}
            onToggleOtherColor={handleOtherColorClick}
            onColorSearchChange={setColorSearch}
            onOtherColorToggle={handleOtherColorChange}
            onOtherColorRemove={removeOtherColor}
            onSizeChange={handleSizeChange}
            onCustomSizeClick={handleCustomSizeClick}
            onCustomLengthChange={setCustomLength}
            onCustomWidthChange={setCustomWidth}
            onAddToCart={handleAdd}
          />
        </div>
        <ProductRelated product={product} products={products} />

        <section className="border-border mt-16 border-t pt-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="mb-10 text-center"
            >
              <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                Deixe a criatividade fluir
              </p>

              <h2 className="text-foreground mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Ainda procurando inspiração?
              </h2>

              <p className="text-muted mx-auto mt-3 max-w-xl text-sm leading-6 sm:text-base">
                Escolha uma cor para imaginar sua peça ou veja outras ideias de
                crochê no Pinterest.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/#cores"
              className="group border-border bg-background hover:border-primary/30 hover:bg-primary/5 focus-visible:ring-primary flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <div
                className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                <FaPalette size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-foreground font-serif text-sm font-semibold sm:text-base">
                  Em dúvida de qual cor usar?
                </h3>

                <p className="text-muted mt-1 text-xs leading-relaxed sm:text-sm">
                  Veja nossas cores e combinações para encontrar o tom ideal.
                </p>

                <span className="text-primary mt-2 inline-block text-[10px] font-semibold tracking-wide uppercase transition-transform duration-300 group-hover:translate-x-1">
                  Ver combinações →
                </span>
              </div>
            </Link>

            <Link
              href={`https://br.pinterest.com/search/pins/?q=${encodeURIComponent(
                `crochê ${product.name}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver inspirações de ${product.name} no Pinterest`}
              className="group border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10 focus-visible:ring-primary flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <div
                className="bg-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                <FaPinterest size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-foreground font-serif text-sm font-semibold sm:text-base">
                  Quer mais ideias?
                </h3>

                <p className="text-muted mt-1 text-xs leading-relaxed sm:text-sm">
                  Encontre referências e inspirações de crochê no Pinterest.
                </p>

                <span className="text-primary mt-2 inline-block text-[10px] font-semibold tracking-wide uppercase transition-transform duration-300 group-hover:translate-x-1">
                  Explorar no Pinterest →
                </span>
              </div>
            </Link>
          </div>
        </section>
        {showTop && (
          <button
            title="Voltar para o início"
            onClick={scrollToTop}
            className="bg-primary fixed right-6 bottom-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105"
          >
            <FaArrowUp size={18} />
          </button>
        )}
      </div>
    </main>
  );
}
