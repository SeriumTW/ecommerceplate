"use client";

import type { TopBarLink } from "@/types/navigation";
import Link from "next/link";
import React from "react";

interface HeaderTopBarProps {
  message: string;
  links: TopBarLink[];
}

const HeaderTopBar: React.FC<HeaderTopBarProps> = ({ message, links }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="hidden lg:block bg-primary-muted text-xs text-text-dark dark:bg-darkmode-light/30 dark:text-darkmode-text">
      <div className="container flex flex-col items-center justify-center gap-2 py-2 text-center sm:flex-row sm:justify-between sm:gap-3 sm:text-left">
        <div className="flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.2em] sm:justify-start">
          <span className="h-2 w-2 rounded-full bg-support-1 dark:bg-support-1" />
          {message}
        </div>
        {links?.length ? (
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium sm:gap-x-6">
            {links.map(({ label, url }) => (
              <Link
                key={label}
                href={url}
                className="transition text-support-1 hover:text-primary hover:underline"
              >
                {label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HeaderTopBar;
