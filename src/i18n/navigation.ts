import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { localeToPathPrefix, locales, defaultLocale } from "@/lib/i18n/config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: {
    mode: "always",
    prefixes: localeToPathPrefix,
  },
  localeDetection: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
