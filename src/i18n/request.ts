import { getRequestConfig } from "next-intl/server";
import { defaultLocale, resolveRouteLocale } from "@/lib/i18n/config";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = resolveRouteLocale(requested) ?? defaultLocale;

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
