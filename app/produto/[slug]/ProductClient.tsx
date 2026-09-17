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
import { useProducts } from "@/hooks/useProducts";
import { useScrollTop } from "@/hooks/useScrollTop";

import { Color } from "@/types/color";
import { formatPath } from "@/utils/format";

import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductRelated from "@/components/product/ProductRelated";
import Share from "@/components/product/Share";

const colors = colorsData as Color[];

type ProductClientProps = {
  slug: string;
};

function checkImageExists(
  src: string,
): Promise<boolean> {
  return new Promise((resolve) => {
    const image = new window.Image();

    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

export default function ProductClient({
  slug,
}: ProductClientProps) {
  const router = useRouter();

  const { showTop, scrollToTop } =
    useScrollTop();

  const { products } = useProducts();
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

  const [images, setImages] =
    useState<string[]>([]);

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

  const addedTimeout =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const product = products.find(
    (item) =>
      formatPath(item.name) === slug,
  );

  const productName = product?.name;

  const productCategory =
    product?.category;

  const currentColorName =
    product?.colors[selectedColor]?.name;

  useEffect(() => {
    if (
      !productName ||
      !productCategory ||
      !currentColorName
    ) {
      setImages([]);
      setSelectedImage(0);
      return;
    }

    let cancelled = false;

    const loadImages = async () => {
      const basePath =
        `/products/${formatPath(
          productCategory,
        )}/${formatPath(
          productName,
        )}/${currentColorName}`;

      const loadedImages: string[] = [];

      for (let index = 1; ; index++) {
        const suffix =
          index === 1
            ? ""
            : `-${index}`;

        const src =
          `${basePath}${suffix}.webp`;

        const exists =
          await checkImageExists(src);

        if (!exists || cancelled) {
          break;
        }

        loadedImages.push(src);
      }

      if (!cancelled) {
        setImages(loadedImages);
        setSelectedImage(0);
      }
    };

    setImages([]);
    setSelectedImage(0);

    loadImages();

    return () => {
      cancelled = true;
    };
  }, [
    productName,
    productCategory,
    currentColorName,
  ]);

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

  const currentColor =
    product.colors[selectedColor];

  const currentSize =
    product.sizes[selectedSize];

  if (!currentColor || !currentSize) {
    return null;
  }

  const imageSrc =
    images[selectedImage];

  const cartSize = isCustomSize
    ? "Outro"
    : currentSize.label;

  const cartColor = isOtherColor
    ? selectedOtherColors.join("/")
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

  const filteredColors =
    colors.filter((color) =>
      color.name
        .toLowerCase()
        .includes(
          colorSearch.toLowerCase(),
        ),
    );

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

    addToCart({
      id: crypto.randomUUID(),
      name: product.name,
      type: isCustomSize ? "custom-order" : "product",
      color: cartColor,
      size: cartSize,
      customLength: isCustomSize ? customLength : undefined,
      customWidth: isCustomSize ? customWidth : undefined,
      // Pedido personalizado não tem preço definido no site.
      price: isCustomSize ? 0 : currentSize.price,
      no_discount: isCustomSize
        ? undefined
        : currentSize.no_discount,
      image: imageSrc,
      quantity: 1,
    });

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
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <a
          href="/#produtos"
            className="group flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-muted/10 hover:text-primary"
          >
            <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />

            <span>Voltar para Produtos</span>
          </a>

          <Share
            product={product}
          />
        </div>

        {/* Produto */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-16 xl:gap-20">

          {/* Galeria */}
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

            {/* Aviso para combinações personalizadas de cores */}
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
                  A peça será produzida nas cores escolhidas.
                </p>
              </div>
            )}
          </div>  


          {/* Informações */}
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

        {/* Produtos relacionados */}
        <ProductRelated
          product={product}
          products={products}
        />

        {/* Voltar ao topo */}
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