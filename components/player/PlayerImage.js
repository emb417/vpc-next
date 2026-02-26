"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

const DISCORD_DEFAULT_AVATARS = Array.from(
  { length: 6 },
  (_, i) => `https://cdn.discordapp.com/embed/avatars/${i}.png`,
);

const randomDiscordAvatar = () =>
  DISCORD_DEFAULT_AVATARS[
    Math.floor(Math.random() * DISCORD_DEFAULT_AVATARS.length)
  ];

export default function PlayerImage({
  src,
  alt,
  width = 26,
  height = 26,
  className = "rounded-full",
  ...rest
}) {
  const fallbackSrc = useRef(randomDiscordAvatar());
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc(fallbackSrc.current)}
      unoptimized
      {...rest}
    />
  );
}
