"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type ImageWithFallbackProps = Omit<ImageProps, "src"> & {
  src?: string;
  fallbackMessage?: string;
  emptyMessage?: string;
  showLoading?: boolean;
};

export default function ImageWithFallback({
  src,
  alt,
  fallbackMessage = "Imagem indisponível",
  emptyMessage = "Imagem indisponível",
  showLoading = false,
  onLoad,
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  const hasError = Boolean(src) && failedSrc === src;

  const isLoading = Boolean(src) && loadedSrc !== src && !hasError;

  if (!src || hasError) {
    return (
      <div
        className="bg-muted/20 text-muted absolute inset-0 flex items-center justify-center px-4 text-center text-sm"
        role="img"
        aria-label={hasError ? fallbackMessage : emptyMessage}
      >
        {hasError ? fallbackMessage : emptyMessage}
      </div>
    );
  }

  return (
    <>
      {showLoading && isLoading && (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          aria-label="Carregando imagem"
        >
          <span className="border-border border-t-primary h-8 w-8 animate-spin rounded-full border-2" />
        </div>
      )}

      <Image
        {...props}
        src={src}
        alt={alt}
        onLoad={(event) => {
          setLoadedSrc(src);
          onLoad?.(event);
        }}
        onError={(event) => {
          setLoadedSrc(src);
          setFailedSrc(src);
          onError?.(event);
        }}
      />
    </>
  );
}
