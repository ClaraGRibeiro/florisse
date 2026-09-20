"use client";

import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import ImageWithFallback from "@/components/ui/ImageWithFallback";

type ProductGalleryProps = {
  productName: string;
  imageSrc?: string;
  images: string[];
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


  const discountPercentage =
    currentPrice !== undefined &&
    originalPrice !== undefined &&
    originalPrice > currentPrice
      ? Math.round(
          (1 - currentPrice / originalPrice) * 100,
        )
      : 0;

  return (
    <div className="relative mx-auto w-full max-w-120">
      <div className="relative aspect-9/12 w-full overflow-hidden rounded-4xl border border-border/20 bg-muted/20 shadow-sm">
        <ImageWithFallback
          key={imageSrc ?? "no-image"}
          src={imageSrc}
          alt={`${productName} - imagem ${selectedImage + 1}`}
          fill
          priority={selectedImage === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
          showLoading={Boolean(imageSrc)}
          emptyMessage="Imagem indisponível para esta seleção"
          fallbackMessage="Não foi possível carregar a imagem"
        />

        {totalSales > 0 && (
          <div className="absolute left-4 top-4 rounded-full bg-background/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur-md">
            {totalSales}{" "}
            {totalSales > 1 ? "vendidos" : "vendido"}
          </div>
        )}

        {discountPercentage > 0 && (
          <div className="absolute right-4 top-4 rounded-full bg-primary px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-sm">
            -{discountPercentage}%
          </div>
        )}

        {hasMultipleImages && (
          <>
            <div className="absolute bottom-4 right-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-muted shadow-sm backdrop-blur-md">
              {selectedImage + 1} / {images.length}
            </div>

            <button
              type="button"
              onClick={onPreviousImage}
              aria-label="Imagem anterior"
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-background"
            >
              <FaChevronLeft
                aria-hidden="true"
                className="text-xs"
              />
            </button>

            <button
              type="button"
              onClick={onNextImage}
              aria-label="Próxima imagem"
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-background"
            >
              <FaChevronRight
                aria-hidden="true"
                className="text-xs"
              />
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div
          className="mt-5 flex items-center justify-center gap-2"
          aria-label="Selecionar imagem"
        >
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => onSelectImage(index)}
              aria-label={`Ver imagem ${index + 1}`}
              aria-current={
                selectedImage === index
                  ? "true"
                  : undefined
              }
              className={`cursor-pointer rounded-full transition-all duration-300 ${
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