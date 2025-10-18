"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

type ImageFallbackProps = Omit<ImageProps, "src"> & {
  src: ImageProps["src"];
  fallback?: ImageProps["src"];
};

const ImageFallback = ({ src, fallback, alt, ...rest }: ImageFallbackProps) => {
  const [imgSrc, setImgSrc] = useState<ImageProps["src"]>(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (fallback) {
          setImgSrc(fallback);
        }
      }}
    />
  );
};

export default ImageFallback;
