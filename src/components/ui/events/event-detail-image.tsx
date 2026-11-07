"use client";

import Image from "next/image";
import { useState } from "react";

type EventDetailImageProps = {
  src: string;
};

export default function EventDetailImage({ src }: EventDetailImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return null;
  }

  return (
    <Image
      src={src}
      alt=""
      fill
      priority
      sizes="(max-width: 1080px) 100vw, 1080px"
      unoptimized
      onError={() => setHasError(true)}
      className="object-cover"
    />
  );
}
