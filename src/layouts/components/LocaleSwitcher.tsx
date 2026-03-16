"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { updateCartMarket } from "@/lib/utils/cartActions";
import { useEffect, useRef, useState, useTransition } from "react";

const localeConfig: Record<
  Locale,
  { flag: string; labelKey: string; currency: string }
> = {
  "es-mx": { flag: "🇲🇽", labelKey: "mexico", currency: "MXN" },
  it: { flag: "🇮🇹", labelKey: "italy", currency: "EUR" },
  en: { flag: "🇺🇸", labelKey: "usa", currency: "USD" },
};

export default function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    startTransition(async () => {
      await updateCartMarket(newLocale);
      router.replace(pathname, { locale: newLocale });
      setIsOpen(false);
    });
  };

  const current = localeConfig[locale as Locale];

  return (
    <div ref={containerRef} className="relative inline-block">
      <div className="relative">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:bg-theme-light"
          aria-label={t("label")}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          disabled={isPending}
          onClick={() => setIsOpen((currentOpen) => !currentOpen)}
        >
          <span className="text-base">{current?.flag}</span>
          <span className="text-xs font-semibold uppercase tracking-wide">
            {current?.currency}
          </span>
          <svg
            className={`h-3 w-3 opacity-60 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
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

        <div
          className={`absolute right-0 z-50 mt-2 min-w-[240px] rounded-2xl border border-border bg-body p-1.5 shadow-lg transition-all ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-1 opacity-0"
          }`}
          role="menu"
          aria-label={t("label")}
        >
          {locales.map((l) => {
            const config = localeConfig[l];
            const isActive = l === locale;

            return (
              <button
                key={l}
                type="button"
                onClick={() => handleLocaleChange(l)}
                disabled={isPending}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-theme-light font-medium text-dark"
                    : "text-dark hover:bg-theme-light"
                }`}
                role="menuitemradio"
                aria-checked={isActive}
              >
                <span className="text-base">{config.flag}</span>
                <span className="flex-1 font-medium">
                  {t(config.labelKey)} · {config.currency}
                </span>
                {isActive && (
                  <svg
                    className="h-4 w-4 text-primary"
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
