"use client";

import colorsData from "@/data/colors.json";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { FaArrowLeft, FaArrowUp } from "react-icons/fa";

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

export default function ProductClient({
  slug,
}: ProductClientProps) {
  const router = useRouter();

  const { showTop, scrollToTop } =
    useScrollTop();

  const products = getProducts();
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] =
    useState(0);

  const [selectedSize, setSelectedSize] =
    useState(0);

  const [isCustomSize, setIsCustomSize] =
    useState(false);

  const [customLength, setCustomLength] =
    useState("");

  const [customWidth, setCustomWidth] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState(0);

  const [added, setAdded] =
    useState(false);

  const [isOtherColor, setIsOtherColor] =
    useState(false);

  const [colorSearch, setColorSearch] =
    useState("");

  const [
    selectedOtherColors,
    setSelectedOtherColors,
  ] = useState<string[]>([]);

  const [miniCartOpen, setMiniCartOpen] =
    useState(false);

  const [addedItem, setAddedItem] =
    useState<AddedItem | null>(null);

  const addedTimeout =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const product = getProductBySlug(slug);

  const currentColor =
    product?.colors[selectedColor];

  const currentColorName =
    typeof currentColor === "string"
      ? currentColor
      : currentColor?.name;

  const images: string[] =
    product && currentColorName
      ? product.images?.[currentColorName] ?? []
      : [];

  useEffect(() => {
    return () => {
      if (addedTimeout.current) {
        clearTimeout(
          addedTimeout.current,
        );
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
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Peça não encontrada
          </h1>

          <p className="mt-3 text-sm text-muted">
            Não encontramos o produto que você
            está procurando.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push("/#produtos")
            }
            className="mt-6 cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
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

  const currentSize =
    product.sizes[selectedSize];

  if (!currentSize) {
    return null;
  }

  const imageSrc =
    images[selectedImage];

  const cartSize = isCustomSize
    ? "Outro"
    : currentSize.label;

  const cartColor = isOtherColor
    ? selectedOtherColors.join("/")
    : typeof currentColor === "string"
      ? currentColor
      : currentColor.name;

  const canAddToCart =
    Boolean(imageSrc) &&
    (!isOtherColor ||
      selectedOtherColors.length > 0) &&
    (!isCustomSize ||
      (customLength.trim().length > 0 &&
        customWidth.trim().length > 0));

  const handleColorChange = (
    index: number,
  ) => {
    setSelectedColor(index);

    setIsOtherColor(false);
    setColorSearch("");
    setSelectedOtherColors([]);

    setSelectedImage(0);
  };

  const handleOtherColorClick = () => {
    setIsOtherColor(
      (previous) => !previous,
    );

    setColorSearch("");
    setSelectedOtherColors([]);

    setSelectedImage(0);
  };

  const handleOtherColorChange = (
    colorName: string,
  ) => {
    setSelectedOtherColors(
      (previous) => {
        if (
          previous.includes(colorName)
        ) {
          return previous.filter(
            (name) =>
              name !== colorName,
          );
        }

        return [
          ...previous,
          colorName,
        ];
      },
    );

    setColorSearch("");
  };

  const removeOtherColor = (
    colorName: string,
  ) => {
    setSelectedOtherColors(
      (previous) =>
        previous.filter(
          (name) =>
            name !== colorName,
        ),
    );
  };

  const handleSizeChange = (
    index: number,
  ) => {
    setSelectedSize(index);

    setIsCustomSize(false);
    setCustomLength("");
    setCustomWidth("");
  };

  const handleCustomSizeClick = () => {
    setIsCustomSize(
      (previous) => !previous,
    );

    if (!isCustomSize) {
      setCustomLength("");
      setCustomWidth("");
    }
  };

  const nextImage = () => {
    if (images.length <= 1) {
      return;
    }

    setSelectedImage(
      (previous) =>
        (previous + 1) %
        images.length,
    );
  };

  const previousImage = () => {
    if (images.length <= 1) {
      return;
    }

    setSelectedImage(
      (previous) =>
        (previous -
          1 +
          images.length) %
        images.length,
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
      type: isCustomSize
        ? "custom-order"
        : "product",
      color: cartColor,
      size: cartSize,
      customLength: isCustomSize
        ? customLength
        : undefined,
      customWidth: isCustomSize
        ? customWidth
        : undefined,

      price: isCustomSize
        ? 0
        : currentSize.price,

      no_discount: isCustomSize
        ? undefined
        : currentSize.no_discount,

      image: imageSrc,
      quantity: 1,
    });
    
    setAddedItem(miniCartItem);
    setMiniCartOpen(true);

    setAdded(true);

    if (addedTimeout.current) {
      clearTimeout(
        addedTimeout.current,
      );
    }

    addedTimeout.current =
      setTimeout(() => {
        setAdded(false);
        addedTimeout.current = null;
      }, 600);
  };

  return (
    <main className="scroll-mt-20 min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-2 sm:px-6 lg:px-8">

        {addedItem && (
          <MiniCart
            isOpen={miniCartOpen}
            name={addedItem.name}
            image={addedItem.image}
            color={addedItem.color}
            size={addedItem.size}
            onClose={() =>
              setMiniCartOpen(false)
            }
          />
        )}

        <div className="mb-2 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="group flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-muted/10 hover:text-primary"
          >
            <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />

            <span>
              Voltar
            </span>
          </button>

          <Share
            product={product}
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-16 xl:gap-20">

          <div>
            <ProductGallery
              productName={product.name}
              imageSrc={imageSrc}
              images={images}
              selectedImage={
                selectedImage
              }
              totalSales={
                product.total_sales ?? 0
              }
              currentPrice={
                currentSize.price
              }
              originalPrice={
                currentSize.no_discount
                  ? Number(
                    currentSize.no_discount,
                  )
                  : undefined
              }
              onPreviousImage={
                previousImage
              }
              onNextImage={nextImage}
              onSelectImage={
                setSelectedImage
              }
            />

            {isOtherColor && (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3.5">
                <div className="mt-0.5 shrink-0 text-primary">
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

                <p className="text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-foreground">
                    A imagem é ilustrativa.
                  </span>{" "}
                  A peça será produzida nas
                  cores escolhidas.
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
            selectedOtherColors={
              selectedOtherColors
            }
            selectedSize={selectedSize}
            isCustomSize={isCustomSize}
            customLength={customLength}
            customWidth={customWidth}
            canAddToCart={canAddToCart}
            added={added}
            onColorChange={
              handleColorChange
            }
            onToggleOtherColor={
              handleOtherColorClick
            }
            onColorSearchChange={
              setColorSearch
            }
            onOtherColorToggle={
              handleOtherColorChange
            }
            onOtherColorRemove={
              removeOtherColor
            }
            onSizeChange={
              handleSizeChange
            }
            onCustomSizeClick={
              handleCustomSizeClick
            }
            onCustomLengthChange={
              setCustomLength
            }
            onCustomWidthChange={
              setCustomWidth
            }
            onAddToCart={
              handleAdd
            }
          />
        </div>

        <ProductRelated
          product={product}
          products={products}
        />

        {showTop && (
          <button
            title="Voltar para o início"
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-105"
          >
            <FaArrowUp size={18} />
          </button>
        )}
      </div>
    </main>
  );
}
