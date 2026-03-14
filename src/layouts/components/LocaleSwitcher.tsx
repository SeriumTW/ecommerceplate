"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { updateCartMarket } from "@/lib/utils/cartActions";
import { useTransition } from "react";

const localeConfig: Record<Locale, { flag: string; labelKey: string }> = {
  "es-mx": { flag: "🇲🇽", labelKey: "mexico" },
  it: { flag: "🇮🇹", labelKey: "italy" },
  en: { flag: "🇺🇸", labelKey: "usa" },
};

export default function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    startTransition(async () => {
      await updateCartMarket(newLocale);
      router.replace(pathname, { locale: newLocale });
    });
  };

  const current = localeConfig[locale as Locale];

  return (
    <div className="relative inline-block">
      <div className="group relative">
        <button
          className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:bg-theme-light"
          aria-label={t("label")}
          disabled={isPending}
        >
          <span className="text-base">{current?.flag}</span>
          <span className="hidden sm:inline">
            {(locale as string).toUpperCase()}
          </span>
          <svg
            className="h-3 w-3 opacity-60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div className="invisible absolute right-0 z-50 mt-1 min-w-[180px] rounded-2xl border border-border bg-body p-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
          {locales.map((l) => {
            const config = localeConfig[l];
            const isActive = l === locale;

            return (
              <button
                key={l}
                onClick={() => handleLocaleChange(l)}
                disabled={isPending}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-theme-light font-medium text-dark"
                    : "text-dark hover:bg-theme-light"
                }`}
              >
                <span className="text-base">{config.flag}</span>
                <span>{t(config.labelKey)}</span>
                {isActive && (
                  <svg
                    className="ml-auto h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
