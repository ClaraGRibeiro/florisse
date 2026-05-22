import { Product } from "@/types/product";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

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
  product: Product;
  selectedColor: number;
  selectedSize: number;
  setSelectedColor: Dispatch<SetStateAction<number>>;
  setSelectedSize: Dispatch<SetStateAction<number>>;
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>;

  addToCart: (params: AddToCartParams) => void; // 👈 AQUI
  formatColor: (color: string) => string;
  formatPath: (name: string) => string;
};

export default function ModalProduct({
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
  const currentColor = product.colors[selectedColor];
  const currentSize = product.sizes[selectedSize];

  const imageSrc = `/products/${formatPath(product.category)}/${formatPath(product.name)}/${currentColor.name}.png`;

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

  const closeModal = () => setSelectedProduct(null);

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-4xl bg-card shadow-2xl animate-in fade-in zoom-in duration-300"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-background/90 text-lg shadow-md backdrop-blur transition hover:scale-105"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative bg-card-soft">
            <Image
              key={currentColor.name}
              src={imageSrc}
              alt={product.name}
              width={700}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-65 w-full object-cover transition-opacity duration-200 sm:h-80 md:h-125 lg:h-162.5"
            />

            <div className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-md backdrop-blur">
              {currentSize.sales} vendidos
            </div>
          </div>

          <div className="flex flex-col justify-between p-5 sm:p-7 md:p-8">
            <div>
              <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                {product.name}
              </h2>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-bold text-primary sm:text-3xl">
                  R$ {currentSize.price.toFixed(2)}
                </span>

                {currentSize.no_discount && (
                  <span className="text-sm text-muted line-through">
                    R$ {currentSize.no_discount}
                  </span>
                )}
              </div>

              <div className="mt-7">
                <p className="mb-3 text-sm font-medium">Escolha a cor:</p>

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
                        className="h-6 w-6 rounded-full border border-white sm:h-5 sm:w-5"
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

              <div className="mt-7">
                <p className="mb-3 text-sm font-medium">Escolha o tamanho:</p>

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

            <button
              onClick={() =>
                addToCart({
                  id: crypto.randomUUID(),
                  name: product.name,
                  color: product.colors[selectedColor].name,
                  size: product.sizes[selectedSize].label,
                  price: currentSize.price,
                  no_discount: currentSize.no_discount,
                  image: imageSrc,
                  quantity: 1,
                })
              }
              className="mt-8 w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-xl transition hover:scale-[1.01] hover:bg-primary-hover sm:py-4 sm:text-lg"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
