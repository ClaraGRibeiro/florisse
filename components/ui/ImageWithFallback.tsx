"use client";

import Image, {
  ImageProps,
} from "next/image";
import { useEffect, useState } from "react";

type ImageWithFallbackProps = Omit<ImageProps, "src"> & {
  src?: string;
  fallbackMessage?: string;
  emptyMessage?: string;
  showLoading?: boolean;
};

export default function ImageWithFallback({
  src,
  fallbackMessage = "Imagem indisponível",
  emptyMessage = "Imagem indisponível",
  showLoading = false,
  onLoad,
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(src));

  useEffect(() => {
    setHasError(false);
    setIsLoading(Boolean(src));
  }, [src]);

  if (!src || hasError) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center bg-muted/20 px-4 text-center text-sm text-muted"
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
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          aria-label="Carregando imagem"
        >
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
        </div>
      )}

      <Image
        {...props}
        src={src}
        onLoad={(event) => {
          setIsLoading(false);
          onLoad?.(event);
        }}
        onError={(event) => {
          setIsLoading(false);
          setHasError(true);
          onError?.(event);
        }}
      />
    </>
  );
}