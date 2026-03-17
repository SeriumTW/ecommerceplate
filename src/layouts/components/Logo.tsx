"use client";

import config from "@/config/config.json";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const Logo = ({ src }: { src?: string }) => {
  const {
    logo,
    logo_width,
    logo_height,
    logo_text,
    title,
  }: {
    logo: string;
    logo_width: any;
    logo_height: any;
    logo_text: string;
    title: string;
  } = config.site;

  const logoPath = src ? src : logo;
  const width = Number(String(logo_width).replace("px", "")) || 70;
  const height = Number(String(logo_height).replace("px", "")) || 70;

  return (
    <Link href="/" className="navbar-brand inline-flex items-center">
      {logoPath ? (
        <Image
          width={width}
          height={height}
          src={logoPath}
          alt={title}
          priority
          className="h-auto w-auto object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.12)]"
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
