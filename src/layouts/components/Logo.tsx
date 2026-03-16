"use client";

import config from "@/config/config.json";
import { Link } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const Logo = ({ src }: { src?: string }) => {
  const {
    logo,
    logo_darkmode,
    logo_width,
    logo_height,
    logo_text,
    title,
  }: {
    logo: string;
    logo_darkmode: string;
    logo_width: any;
    logo_height: any;
    logo_text: string;
    title: string;
  } = config.site;

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const resolvedLogo =
    mounted && (theme === "dark" || resolvedTheme === "dark")
      ? logo_darkmode
      : logo;
  const logoPath = src ? src : resolvedLogo;
  const width = Number(String(logo_width).replace("px", "")) || 70;
  const height = Number(String(logo_height).replace("px", "")) || 70;

  return (
    <Link href="/" className="navbar-brand inline-block">
      {logoPath ? (
        <Image
          width={width}
          height={height}
          src={logoPath}
          alt={title}
          priority
          className="h-auto w-auto object-contain"
          style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
    </Link>
  );
};

export default Logo;
