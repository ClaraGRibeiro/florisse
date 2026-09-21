"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const hasMultipleImages = images.length > 1;
  const imageSrc = images[selectedImage];

  const isCurrentImageLoaded = imageSrc ? loadedImages[imageSrc] : false;

  const goToPrevious = () => {
    setSelectedImage((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setSelectedImage((current) =>
      current === images.length - 1 ? 0 : current + 1,
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
      <div className="border-border/20 bg-muted/20 relative aspect-9/12 w-full overflow-hidden rounded-4xl border shadow-sm">
        {imageSrc ? (
          <>
            {/* LOADING SOMENTE ENQUANTO A IMAGEM ATUAL NÃO FOI CARREGADA */}
            {!isCurrentImageLoaded && (
              <div
                className="bg-muted/20 absolute inset-0 z-0 flex items-center justify-center"
                aria-label="Carregando imagem"
              >
                <span className="border-border border-t-primary h-8 w-8 animate-spin rounded-full border-2" />
              </div>
            )}

            <Image
              key={imageSrc}
              src={imageSrc}
              alt={`${productName} - imagem ${selectedImage + 1}`}
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
            <FaClover size={24} className="text-primary" aria-hidden="true" />
          </div>
        )}

        {/* BADGE */}
        <div className="bg-background/90 text-primary absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase shadow-sm backdrop-blur-md">
          <FaClover size={10} aria-hidden="true" />
          Rifa Florisse
        </div>

        {hasMultipleImages && (
          <>
            {/* CONTADOR */}
            <div className="bg-background/90 text-muted absolute right-4 bottom-4 z-20 rounded-full px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-md">
              {selectedImage + 1} / {images.length}
            </div>

            {/* ANTERIOR */}
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Imagem anterior"
              className="border-border/70 bg-background/90 text-foreground hover:bg-background focus-visible:ring-primary absolute top-1/2 left-4 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <FaChevronLeft aria-hidden="true" className="text-xs" />
            </button>

            {/* PRÓXIMA */}
            <button
              type="button"
              onClick={goToNext}
              aria-label="Próxima imagem"
              className="border-border/70 bg-background/90 text-foreground hover:bg-background focus-visible:ring-primary absolute top-1/2 right-4 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <FaChevronRight aria-hidden="true" className="text-xs" />
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
              aria-current={selectedImage === index ? "true" : undefined}
              className={`focus-visible:ring-primary cursor-pointer rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
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
