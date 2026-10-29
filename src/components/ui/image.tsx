"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageOff as ImageOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProgressiveImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc?: string;
  aspectRatio?: string;
  containerClassName?: string;
}

export const ProgressiveImage = React.forwardRef<
  HTMLImageElement,
  ProgressiveImageProps
>(
  (
    {
      src,
      alt = "",
      placeholderSrc,
      aspectRatio = "16/9",
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const imgRef = React.useRef<HTMLImageElement | null>(null);

    React.useImperativeHandle(ref, () => imgRef.current as HTMLImageElement);

    // Check if image is already cached/complete on mount
    React.useEffect(() => {
      if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      }
    }, [src]);

    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-muted/50 select-none",
          "border border-border/40",
          containerClassName
        )}
        style={{ aspectRatio }}
      >
        {/* 1. Low-Resolution / BlurHash Placeholder Layer (Detail #8) */}
        {placeholderSrc && !isLoaded && !hasError && (
          <img
            src={placeholderSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover filter blur-lg scale-110 opacity-70 transition-opacity duration-300"
          />
        )}

        {/* 2. Specular Shimmer Skeleton Overlay while awaiting full decode */}
        <AnimatePresence>
          {!isLoaded && !hasError && (
            <motion.div
              key="shimmer-skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 size-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"
            />
          )}
        </AnimatePresence>

        {/* 3. Error Fallback State */}
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground p-4 text-center">
            <ImageOffIcon size={24} className="opacity-50" />
            <span className="text-xs font-medium">Failed to load media</span>
          </div>
        ) : (
          /* 4. Full High-Resolution Target Image */
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={cn(
              "size-full object-cover transition-opacity duration-300 ease-out",
              isLoaded ? "opacity-100" : "opacity-0",
              className
            )}
            {...props}
          />
        )}
      </div>
    );
  }
);
ProgressiveImage.displayName = "ProgressiveImage";
