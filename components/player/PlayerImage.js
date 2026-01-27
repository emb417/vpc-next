"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  GiBabyFace,
  GiBearFace,
  GiCyborgFace,
  GiDwarfFace,
  GiDoctorFace,
  GiInvisibleFace,
  GiMonkFace,
  GiPigFace,
  GiWizardFace,
} from "react-icons/gi";

const faces = [
  GiBabyFace,
  GiBearFace,
  GiCyborgFace,
  GiDwarfFace,
  GiDoctorFace,
  GiInvisibleFace,
  GiMonkFace,
  GiPigFace,
  GiWizardFace,
];

export default function PlayerImage({
  src,
  alt,
  width = 26,
  height = 26,
  className = "rounded-full",
  fallbackClassName = "w-8 h-8 rounded-full bg-orange-950 text-orange-500",
  ...rest
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    const Face = faces[Math.floor(Math.random() * faces.length)];
    return (
      <Face
        className={`${fallbackClassName} rounded-full bg-orange-950 text-orange-500`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setHasError(true)}
      unoptimized
      {...rest}
    />
  );
}
