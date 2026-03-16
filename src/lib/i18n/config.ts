export const locales = ["es-mx", "it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es-mx";

export const localeToPathPrefix: Record<Locale, string> = {
  "es-mx": "/mx",
  it: "/it",
  en: "/en",
};

export const pathPrefixToLocale = Object.fromEntries(
  Object.entries(localeToPathPrefix).map(([locale, prefix]) => [
    prefix,
    locale,
  ]),
) as Record<string, Locale>;

export const localeToShopify: Record<
  Locale,
  { country: string; language: string }
> = {
  "es-mx": { country: "MX", language: "ES" },
  it: { country: "IT", language: "IT" },
  en: { country: "US", language: "EN" },
};

export const localeToIntl: Record<Locale, string> = {
  "es-mx": "es-MX",
  it: "it-IT",
  en: "en-US",
};
