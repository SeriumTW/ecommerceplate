import config from "@/config/config.json";
import {
  defaultLocale,
  locales,
  localeToIntl,
  type Locale,
} from "@/lib/i18n/config";

const siteUrl = config.site.base_url.replace(/\/$/, "");

const normalizePathname = (pathname: string) => {
  const cleanedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutLocale = cleanedPathname.replace(
    new RegExp(`^/(${locales.join("|")})(?=/|$)`),
    "",
  );

  return withoutLocale || "/";
};

export const getLocalizedUrl = (locale: Locale, pathname = "/") => {
  const normalizedPathname = normalizePathname(pathname);
  const localePrefix = locale === defaultLocale ? "" : `/${locale}`;

  return `${siteUrl}${localePrefix}${normalizedPathname === "/" ? "" : normalizedPathname}`;
};

export const getMetadataAlternates = (locale: Locale, pathname = "/") => ({
  canonical: getLocalizedUrl(locale, pathname),
  languages: {
    ...Object.fromEntries(
      locales.map((entry) => [
        localeToIntl[entry],
        getLocalizedUrl(entry, pathname),
      ]),
    ),
    "x-default": getLocalizedUrl(defaultLocale, pathname),
  },
});
