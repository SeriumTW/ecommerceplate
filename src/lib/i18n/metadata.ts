import config from "@/config/config.json";
import {
  defaultLocale,
  localeToPathPrefix,
  locales,
  localeToIntl,
  type Locale,
} from "@/lib/i18n/config";

const siteUrl = config.site.base_url.replace(/\/$/, "");

const normalizePathname = (pathname: string) => {
  const cleanedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const localePrefixes = Object.values(localeToPathPrefix)
    .map((prefix) => prefix.slice(1))
    .join("|");
  const withoutLocale = cleanedPathname.replace(
    new RegExp(`^/(${localePrefixes})(?=/|$)`),
    "",
  );

  return withoutLocale || "/";
};

export const getLocalizedUrl = (locale: Locale, pathname = "/") => {
  const normalizedPathname = normalizePathname(pathname);
  const localePrefix = localeToPathPrefix[locale];

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
