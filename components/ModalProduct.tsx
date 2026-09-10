import { Product } from "@/types/product";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCheck } from "react-icons/fa";

type AddToCartParams = {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  no_discount?: number;
  image: string;
  quantity: number;
};

type ModalProductProps = {
  openPersonalized: () => void;
  product: Product;
  selectedColor: number;
  selectedSize: number;
  setSelectedColor: Dispatch<SetStateAction<number>>;
  setSelectedSize: Dispatch<SetStateAction<number>>;
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>;
  addToCart: (params: AddToCartParams) => void;
  formatColor: (color: string) => string;
  formatPath: (name: string) => string;
};

export default function ModalProduct({
  openPersonalized,
  product,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
  setSelectedProduct,
  addToCart,
  formatColor,
  formatPath,
}: ModalProductProps) {
  const [added, setAdded] = useState(false);

  const currentColor = product.colors[selectedColor];
  const currentSize = product.sizes[selectedSize];

  const imageSrc = `/products/${formatPath(product.category)}/${formatPath(
    product.name,
  )}/${currentColor.name}.webp`;

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

  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex max-h-[96vh] w-full max-w-5xl flex-col overflow-y-auto rounded-3xl bg-card shadow-2xl sm:rounded-4xl"
      >
        {/* Botão fechar */}
        <button
          onClick={closeModal}
          className="absolute right-3 top-3 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-background/90 text-base shadow-md backdrop-blur transition hover:scale-105 sm:right-4 sm:top-4 sm:h-10 sm:w-10 sm:text-lg"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2">
          {/* IMAGEM */}
          <div className="relative bg-card-soft">
            <Image
              key={currentColor.name}
              src={imageSrc}
              alt={`${product.name} - ${formatColor(currentColor.name)}`}
              width={700}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-[260px] w-full object-cover sm:h-80 md:h-125 lg:h-162.5"
            />

            {/* Badges */}
            <div className="absolute left-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
              {currentSize?.sales !== undefined &&
                currentSize.sales > 0 && (
                  <div className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-md backdrop-blur">
                    {currentSize.sales > 1
                      ? `${currentSize.sales} vendidos`
                      : `${currentSize.sales} vendido`}
                  </div>
                )}

              {currentSize?.no_discount && (
                <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold leading-none text-white shadow-md">
                  -10%
                </span>
              )}
            </div>
          </div>

          {/* INFORMAÇÕES */}
          <div className="flex flex-col justify-between p-4 sm:p-7 md:p-8">
            <div>
              {/* Nome */}
              <h2 className="pr-10 text-2xl font-bold leading-tight sm:text-3xl md:pr-0 md:text-4xl">
                {product.name}
              </h2>

              {/* Preço */}
              <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-3">
                <span className="text-2xl font-bold text-primary sm:text-3xl">
                  R$ {currentSize.price.toFixed(2)}
                </span>

                {currentSize.no_discount && (
                  <span className="text-sm text-muted line-through">
                    R$ {currentSize.no_discount}
                  </span>
                )}
              </div>

              {/* CORES */}
              <div className="mt-5 sm:mt-7">
                <p className="mb-2 text-sm font-medium sm:mb-3">
                  Escolha a cor:
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(index)}
                      className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${
                        selectedColor === index
                          ? "scale-105 border-primary bg-primary text-primary-foreground shadow-lg"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      <div
                        className="h-5 w-5 shrink-0 rounded-full border border-white"
                        style={{
                          background: getGradient(color.hex),
                        }}
                      />

                      <span className="font-medium">
                        {formatColor(color.name)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* TAMANHOS */}
              <div className="mt-5 sm:mt-7">
                <p className="mb-2 text-sm font-medium sm:mb-3">
                  Escolha o tamanho:
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(index)}
                      className={`cursor-pointer rounded-full border px-3 py-2 text-sm transition-all ${
                        selectedSize === index
                          ? "border-primary bg-primary text-white shadow-md"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AÇÕES */}
            <div className="mt-6 sm:mt-8">
              {/* Personalizar */}
              <button
                onClick={() => {
                  closeModal();
                  openPersonalized();
                }}
                className="w-full cursor-pointer text-center text-sm text-muted underline-offset-4 transition hover:text-primary hover:underline sm:text-left"
              >
                Não encontrou o que procura? Personalize seu pedido.
              </button>

              {/* Comprar */}
              <button
                onClick={handleAdd}
                className={`mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold text-primary-foreground shadow-xl transition sm:mt-4 sm:py-4 sm:text-lg ${
                  added
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
      </motion.div>
    </div>
  );
}