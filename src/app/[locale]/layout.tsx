import Cart from "@/components/cart/Cart";
import OpenCart from "@/components/cart/OpenCart";
import config from "@/config/config.json";
import theme from "@/config/theme.json";
import TwSizeIndicator from "@/helpers/TwSizeIndicator";
import { locales, localeToIntl } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const intlLocale = localeToIntl[locale as Locale];
  const siteUrl = config.site.base_url.replace(/\/$/, "");

  return (
    <html suppressHydrationWarning={true} lang={intlLocale}>
      <head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link rel="shortcut icon" href={config.site.favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="commerceplate" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />

        {/* hreflang tags */}
        {locales.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={localeToIntl[l]}
            href={`${siteUrl}/${l}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/es-mx`} />

        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        />
      </head>

      <body suppressHydrationWarning={true}>
        <TwSizeIndicator />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header
              cartFallback={
                <Link
                  href="/cart"
                  aria-label="Apri il carrello"
                  className="relative inline-flex items-center justify-center"
                >
                  <OpenCart />
                </Link>
              }
              cartContent={<Cart />}
            />
            <main>{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
