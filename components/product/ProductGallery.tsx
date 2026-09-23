"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  productName: string;

  imageSrc: string | undefined;
  images: ProductImage[];
  selectedImage: number;

  totalSales?: number;
  currentPrice?: number;
  originalPrice?: number;

  onPreviousImage: () => void;
  onNextImage: () => void;
  onSelectImage: (index: number) => void;
};

export default function ProductGallery({
  productName,
  imageSrc,
  images,
  selectedImage,
  totalSales = 0,
  currentPrice,
  originalPrice,
  onPreviousImage,
  onNextImage,
  onSelectImage,
}: ProductGalleryProps) {
  const hasMultipleImages = images.length > 1;

  const currentImage = images[selectedImage];

  const discountPercentage =
    currentPrice !== undefined &&
    originalPrice !== undefined &&
    originalPrice > currentPrice
      ? Math.round((1 - currentPrice / originalPrice) * 100)
      : 0;

  return (
    <div className="relative mx-auto w-full max-w-120">
      <div className="border-border/20 bg-muted/20 relative aspect-9/12 w-full overflow-hidden rounded-4xl border shadow-sm">
        <ImageWithFallback
          key={imageSrc ?? "no-image"}
          src={imageSrc}
          alt={
            currentImage?.alt ?? `${productName} - imagem ${selectedImage + 1}`
          }
          fill
          priority={selectedImage === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
          showLoading={Boolean(imageSrc)}
          emptyMessage="Imagem indisponível para esta seleção"
          fallbackMessage="Não foi possível carregar a imagem"
          className="object-cover"
        />
        {currentImage?.alt && (
          <div
            className="bg-primary/50 absolute bottom-4 left-1/2 z-20 max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full px-4 py-2 text-center text-[11px] leading-relaxed text-white shadow-md backdrop-blur-md"
            aria-live="polite"
          >
            Na imagem: {currentImage.alt}
          </div>
        )}

        {totalSales > 0 && (
          <div className="bg-background/90 text-primary absolute top-4 left-4 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase shadow-sm backdrop-blur-md">
            {totalSales} {totalSales > 1 ? "vendidos" : "vendido"}
          </div>
        )}

        {discountPercentage > 0 && (
          <div className="bg-primary text-primary-foreground absolute top-4 right-4 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase shadow-sm">
            -{discountPercentage}%
          </div>
        )}

        {hasMultipleImages && (
          <>
            <div className="bg-background/90 text-muted absolute right-4 bottom-4 rounded-full px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-md">
              {selectedImage + 1} / {images.length}
            </div>

            <button
              type="button"
              onClick={onPreviousImage}
              aria-label="Imagem anterior"
              className="border-border/70 bg-background/90 text-foreground hover:bg-background absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105"
            >
              <FaChevronLeft aria-hidden="true" className="text-xs" />
            </button>

            <button
              type="button"
              onClick={onNextImage}
              aria-label="Próxima imagem"
              className="border-border/70 bg-background/90 text-foreground hover:bg-background absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105"
            >
              <FaChevronRight aria-hidden="true" className="text-xs" />
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div
          className="mt-4 flex items-center justify-center gap-2"
          aria-label="Selecionar imagem"
        >
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              onClick={() => onSelectImage(index)}
              aria-label={`Ver imagem ${index + 1}: ${image.alt}`}
              aria-current={selectedImage === index ? "true" : undefined}
              className={`cursor-pointer rounded-full transition-all duration-300 ${
                selectedImage === index
                  ? "bg-primary h-2 w-7"
                  : "bg-border hover:bg-primary/50 h-2 w-2"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
