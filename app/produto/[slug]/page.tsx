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

import { Color } from "@/types/color";
import { formatPath } from "@/utils/format";

import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductRelated from "@/components/product/ProductRelated";
import Share from "@/components/product/Share";
import { useScrollTop } from "@/hooks/useScrollTop";

const colors = colorsData as Color[];

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
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

export default function ProductPage({
  params,
}: ProductPageProps) {
  const { showTop, scrollToTop } = useScrollTop();

  const { products } = useProducts();
  const { addToCart } = useCart();
  const router = useRouter();

  const [slug, setSlug] =
    useState<string | null>(null);

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

  /*
   * Resolve o slug da página.
   */
  useEffect(() => {
    let active = true;

    params.then(({ slug: currentSlug }) => {
      if (active) {
        setSlug(currentSlug);
      }
    });

    return () => {
      active = false;
    };
  }, [params]);

  /*
   * Encontra o produto pelo slug.
   */
  const product = slug
    ? products.find(
      (item) =>
        formatPath(item.name) === slug,
    )
    : undefined;

  /*
   * IMPORTANTE:
   *
   * Não colocamos "product" inteiro nas dependências
   * do useEffect.
   *
   * O objeto pode receber uma nova referência a cada
   * renderização e isso poderia criar um loop:
   *
   * render
   * → effect
   * → setImages
   * → render
   * → effect
   * → ...
   *
   * Por isso usamos apenas valores primitivos.
   */
  const productName = product?.name;

  const productCategory =
    product?.category;

  const currentColorName =
    product?.colors[selectedColor]?.name;

  /*
   * Procura as imagens da cor selecionada.
   *
   * Exemplo:
   *
   * cru.webp
   * cru-2.webp
   * cru-3.webp
   */
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

    /*
     * Limpa as imagens anteriores enquanto
     * as novas são carregadas.
     */
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

  /*
   * Limpa o timeout do botão de adicionar
   * ao desmontar a página.
   */
  useEffect(() => {
    return () => {
      if (addedTimeout.current) {
        clearTimeout(
          addedTimeout.current,
        );
      }
    };
  }, []);

  /*
   * Enquanto os dados ainda estão carregando.
   */
  if (!slug || products.length === 0) {
    return null;
  }

  /*
   * Produto inexistente.
   */
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

  /*
   * Proteção caso os índices deixem de existir.
   */
  if (!currentColor || !currentSize) {
    return null;
  }

  const imageSrc =
    images[selectedImage];

  const cartSize = isCustomSize
    ? `${customLength}x${customWidth}cm`
    : currentSize.label;

  const cartColor = isOtherColor
    ? selectedOtherColors.join("/")
    : currentColor.name;

  const canAddToCart =
    Boolean(imageSrc) &&
    Boolean(currentColor) &&
    (!isOtherColor ||
      selectedOtherColors.length > 0) &&
    (!isCustomSize ||
      (customLength.trim().length > 0 &&
        customWidth.trim().length > 0));

  /*
   * Seleciona uma cor normal.
   */
  const handleColorChange = (
    index: number,
  ) => {
    setSelectedColor(index);

    setIsOtherColor(false);
    setColorSearch("");
    setSelectedOtherColors([]);

    setSelectedImage(0);
  };

  /*
   * Ativa/desativa "Outra".
   */
  const handleOtherColorClick = () => {
    setIsOtherColor(
      (previous) => !previous,
    );

    setColorSearch("");
    setSelectedOtherColors([]);

    setSelectedImage(0);
  };

  /*
   * Filtra as cores.
   */
  const filteredColors =
    colors.filter((color) =>
      color.name
        .toLowerCase()
        .includes(
          colorSearch.toLowerCase(),
        ),
    );

  /*
   * Seleciona uma cor personalizada.
   */
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

  /*
   * Remove uma cor personalizada.
   */
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

  /*
   * Seleciona tamanho padrão.
   */
  const handleSizeChange = (
    index: number,
  ) => {
    setSelectedSize(index);

    setIsCustomSize(false);
    setCustomLength("");
    setCustomWidth("");
  };

  /*
   * Ativa/desativa tamanho personalizado.
   */
  const handleCustomSizeClick = () => {
    setIsCustomSize(
      (previous) => !previous,
    );

    if (!isCustomSize) {
      setCustomLength("");
      setCustomWidth("");
    }
  };

  /*
   * Próxima imagem.
   */
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

  /*
   * Imagem anterior.
   */
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

  /*
   * Adicionar ao carrinho.
   */
  const handleAdd = () => {
    if (!canAddToCart) {
      return;
    }

    addToCart({
      id: crypto.randomUUID(),
      name: product.name,
      color: cartColor,
      size: cartSize,
      price: currentSize.price,
      no_discount:
        currentSize.no_discount,
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
          <button
            type="button"
            onClick={() =>
              router.back()
            }
            className="group flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-muted/10 hover:text-primary"
          >
            <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />

            <span>Voltar</span>
          </button>


          <Share
            product={product}
            imageSrc={imageSrc}
          />
        </div>

        {/* Produto */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-16 xl:gap-20">
          {/* Galeria */}
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

          {/* Informações */}
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

        {/* PRODUTOS RELACIONADOS */}
        <ProductRelated
          product={product}
          products={products}
        />
        {showTop && (
          <button
            title="Voltar para o início"
            onClick={scrollToTop}
            className="cursor-pointer fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-105"
          >
            <FaArrowUp size={18} />
          </button>
        )}
      </div>
    </main>
  );
}