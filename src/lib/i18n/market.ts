import { hasLocale } from "next-intl";
import { locales, type Locale } from "@/lib/i18n/config";

export const MARKET_OVERRIDE_COOKIE = "MARKET_OVERRIDE";

const EUROPEAN_COUNTRIES = new Set([
  "AD",
  "AL",
  "AT",
  "BA",
  "BE",
  "BG",
  "BY",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FO",
  "FR",
  "GB",
  "GI",
  "GR",
  "HR",
  "HU",
  "IE",
  "IS",
  "IT",
  "LI",
  "LT",
  "LU",
  "LV",
  "MC",
  "MD",
  "ME",
  "MK",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "RS",
  "SE",
  "SI",
  "SK",
  "SM",
  "UA",
  "VA",
]);

const SUPPORTED_COUNTRIES = new Set(["MX", ...EUROPEAN_COUNTRIES]);

const COUNTRY_HEADER_CANDIDATES = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "x-country-code",
  "x-country",
] as const;

type HeadersReader = Pick<Headers, "get">;
type CookiesReader = {
  get(name: string): { value: string } | undefined;
};

export const isEuropeanCountry = (countryCode?: string | null) =>
  Boolean(countryCode && EUROPEAN_COUNTRIES.has(countryCode));

export const isSupportedCountry = (countryCode?: string | null) =>
  !countryCode || SUPPORTED_COUNTRIES.has(countryCode);

export const getCountryFromHeaders = (headers: HeadersReader) => {
  for (const headerName of COUNTRY_HEADER_CANDIDATES) {
    const value = headers.get(headerName)?.trim().toUpperCase();
    if (value && value.length === 2 && value !== "XX" && value !== "T1") {
      return value;
    }
  }

  return undefined;
};

export const resolveLocaleFromCountry = (
  countryCode?: string | null,
): Locale => {
  if (countryCode === "MX") {
    return "es-mx";
  }

  if (countryCode === "IT") {
    return "it";
  }

  if (isEuropeanCountry(countryCode)) {
    return "en";
  }

  return "en";
};

export const resolveLocaleFromAcceptLanguage = (
  acceptLanguage?: string | null,
): Locale => {
  if (!acceptLanguage) {
    return "en";
  }

  const normalized = acceptLanguage.toLowerCase();

  if (normalized.includes("it")) {
    return "it";
  }

  if (normalized.includes("es-mx")) {
    return "es-mx";
  }

  return "en";
};

export const resolveAutomaticLocale = (headers: HeadersReader): Locale => {
  const countryCode = getCountryFromHeaders(headers);

  if (countryCode) {
    return resolveLocaleFromCountry(countryCode);
  }

  return resolveLocaleFromAcceptLanguage(headers.get("accept-language"));
};

export const getManualOverrideLocale = (cookies: CookiesReader) => {
  const hasManualOverride =
    cookies.get(MARKET_OVERRIDE_COOKIE)?.value === "true";
  const localeCookie = cookies.get("NEXT_LOCALE")?.value;

  if (hasManualOverride && hasLocale(locales, localeCookie)) {
    return localeCookie;
  }

  return undefined;
};

export const resolveRequestMarket = (
  headers: HeadersReader,
  cookies: CookiesReader,
  currentLocale?: Locale,
) => {
  const countryCode = getCountryFromHeaders(headers);
  const manualOverrideLocale = getManualOverrideLocale(cookies);
  const locale =
    currentLocale ?? manualOverrideLocale ?? resolveAutomaticLocale(headers);

  return {
    countryCode,
    locale,
    manualOverrideLocale,
    checkoutAllowed: isSupportedCountry(countryCode),
  };
};
