import Cart from "@/components/cart/Cart";
import OpenCart from "@/components/cart/OpenCart";
import config from "@/config/config.json";
import theme from "@/config/theme.json";
import TwSizeIndicator from "@/helpers/TwSizeIndicator";
import {
  localeToIntl,
  publicLocaleSegments,
  resolveRouteLocale,
} from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return publicLocaleSegments.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale = resolveRouteLocale(locale);

  if (!normalizedLocale) {
    notFound();
  }

  setRequestLocale(normalizedLocale);

  const messages = await getMessages();
  const cartTranslations = (await getMessages()).cart as {
    openCartEmpty: string;
  };

  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const intlLocale = localeToIntl[normalizedLocale as Locale];

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
                  aria-label={cartTranslations.openCartEmpty}
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
