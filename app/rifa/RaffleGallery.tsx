"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaClover } from "react-icons/fa6";

type RaffleGalleryProps = {
  productName: string;
  images: string[];
};

export default function RaffleGallery({
  productName,
  images,
}: RaffleGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState<
    Record<string, boolean>
  >({});

  const hasMultipleImages = images.length > 1;
  const imageSrc = images[selectedImage];

  const isCurrentImageLoaded =
    imageSrc ? loadedImages[imageSrc] : false;

  const goToPrevious = () => {
    setSelectedImage((current) =>
      current === 0
        ? images.length - 1
        : current - 1,
    );
  };

  const goToNext = () => {
    setSelectedImage((current) =>
      current === images.length - 1
        ? 0
        : current + 1,
    );
  };

  const handleImageLoad = () => {
    if (!imageSrc) return;

    setLoadedImages((current) => ({
      ...current,
      [imageSrc]: true,
    }));
  };

  return (
    <div className="relative mx-auto w-full max-w-120">
      {/* IMAGEM PRINCIPAL */}
      <div className="relative aspect-9/12 w-full overflow-hidden rounded-4xl border border-border/20 bg-muted/20 shadow-sm">
        {imageSrc ? (
          <>
            {/* LOADING SOMENTE ENQUANTO A IMAGEM ATUAL NÃO FOI CARREGADA */}
            {!isCurrentImageLoaded && (
              <div
                className="absolute inset-0 z-0 flex items-center justify-center bg-muted/20"
                aria-label="Carregando imagem"
              >
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
              </div>
            )}

            <Image
              key={imageSrc}
              src={imageSrc}
              alt={`${productName} - imagem ${
                selectedImage + 1
              }`}
              fill
              priority={selectedImage === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              onLoad={handleImageLoad}
              onError={handleImageLoad}
              className="object-cover"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FaClover
              size={24}
              className="text-primary"
              aria-hidden="true"
            />
          </div>
        )}

        {/* BADGE */}
        <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur-md">
          <FaClover
            size={10}
            aria-hidden="true"
          />

          Rifa Florisse
        </div>

        {hasMultipleImages && (
          <>
            {/* CONTADOR */}
            <div className="absolute bottom-4 right-4 z-20 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-muted shadow-sm backdrop-blur-md">
              {selectedImage + 1} / {images.length}
            </div>

            {/* ANTERIOR */}
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Imagem anterior"
              className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <FaChevronLeft
                aria-hidden="true"
                className="text-xs"
              />
            </button>

            {/* PRÓXIMA */}
            <button
              type="button"
              onClick={goToNext}
              aria-label="Próxima imagem"
              className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <FaChevronRight
                aria-hidden="true"
                className="text-xs"
              />
            </button>
          </>
        )}
      </div>

      {/* INDICADORES */}
      {hasMultipleImages && (
        <div
          className="mt-5 flex items-center justify-center gap-2"
          aria-label="Selecionar imagem"
        >
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`Ver imagem ${index + 1}`}
              aria-current={
                selectedImage === index
                  ? "true"
                  : undefined
              }
              className={`cursor-pointer rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                selectedImage === index
                  ? "h-2 w-7 bg-primary"
                  : "h-2 w-2 bg-border hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}