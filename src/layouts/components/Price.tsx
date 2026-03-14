"use client";

import { useLocale } from "next-intl";
import { localeToIntl } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";

const Price = ({
  amount,
  className,
  currencyCode = "USD",
  currencyCodeClassName,
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<"p">) => {
  const locale = useLocale();
  const intlLocale = localeToIntl[locale as Locale] || locale;

  return (
    <p suppressHydrationWarning={true} className={className}>
      {`${new Intl.NumberFormat(intlLocale, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "narrowSymbol",
      }).format(parseFloat(amount))}`}
      <span className={`ml-1 inline ${currencyCodeClassName}`}>
        {currencyCode}
      </span>
    </p>
  );
};

export default Price;
