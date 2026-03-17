"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { updateCartMarket } from "@/lib/utils/cartActions";
import { useEffect, useId, useRef, useState, useTransition } from "react";

const FlagMX = () => (
  <svg viewBox="0 0 640 480" className="h-4 w-6 shrink-0 rounded-[3px]">
    <rect width="213.3" height="480" fill="#006847" />
    <rect x="213.3" width="213.4" height="480" fill="#fff" />
    <rect x="426.7" width="213.3" height="480" fill="#ce1126" />
    <circle cx="320" cy="240" r="45" fill="#006847" />
  </svg>
);

const FlagIT = () => (
  <svg viewBox="0 0 640 480" className="h-4 w-6 shrink-0 rounded-[3px]">
    <rect width="213.3" height="480" fill="#009246" />
    <rect x="213.3" width="213.4" height="480" fill="#fff" />
    <rect x="426.7" width="213.3" height="480" fill="#ce2b37" />
  </svg>
);

const FlagGlobe = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="h-4 w-5 shrink-0"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
  </svg>
);

const Spinner = () => (
  <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth={3}
      className="opacity-20"
    />
    <path
      d="M12 2a10 10 0 0 1 10 10"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      className="opacity-75"
    />
  </svg>
);

const localeConfig: Record<
  Locale,
  {
    Flag: React.FC;
    labelKey: string;
    langKey: string;
    currency: string;
  }
> = {
  "es-mx": {
    Flag: FlagMX,
    labelKey: "mexico",
    langKey: "mexicoLang",
    currency: "MXN",
  },
  it: {
    Flag: FlagIT,
    labelKey: "italy",
    langKey: "italyLang",
    currency: "EUR",
  },
  en: {
    Flag: FlagGlobe,
    labelKey: "international",
    langKey: "internationalLang",
    currency: "USD",
  },
};

interface LocaleSwitcherProps {
  placement?: "bottom" | "top";
  showCaret?: boolean;
}

export default function LocaleSwitcher({
  placement = "bottom",
  showCaret = true,
}: LocaleSwitcherProps) {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const openUp = placement === "top";

  useEffect(() => {
    if (!isOpen) return;

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
        buttonRef.current?.focus();
      }
    };

    const handleViewportChange = () => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    startTransition(async () => {
      await updateCartMarket(newLocale);
      router.replace(pathname, { locale: newLocale });
      setIsOpen(false);
    });
  };

  const current = localeConfig[locale as Locale];
  const CurrentFlag = current?.Flag;
  const menuPositionClasses = openUp
    ? "bottom-[calc(100%+0.5rem)] right-0 origin-bottom-right"
    : "top-[calc(100%+0.5rem)] right-0 origin-top-right";
  const outerCaretClasses = openUp
    ? "-bottom-[6px] border-t-[6px] border-t-border border-b-0 "
    : "-top-[6px] border-b-[6px] border-b-border border-t-0 ";
  const innerCaretClasses = openUp
    ? "-bottom-[5px] border-t-[6px] border-t-body border-b-0 "
    : "-top-[5px] border-b-[6px] border-b-body border-t-0 ";

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        className="flex min-h-[44px] items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-medium text-text-dark transition-colors hover:bg-theme-light   "
        aria-label={t("label")}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        disabled={isPending}
        onClick={() => setIsOpen((open) => !open)}
      >
        {CurrentFlag ? <CurrentFlag /> : null}
        <span className="text-xs font-semibold uppercase tracking-wide">
          {current?.currency}
        </span>
        {isPending ? (
          <Spinner />
        ) : (
          <svg
            className={`h-3 w-3 opacity-50 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
        )}
      </button>

      {isOpen ? (
        <div
          id={menuId}
          className={`absolute z-50 w-[min(260px,calc(100vw-1rem))] rounded-2xl border border-border bg-body p-1.5 shadow-lg transition-all   ${menuPositionClasses}`}
          role="menu"
          aria-label={t("label")}
        >
          {showCaret ? (
            <>
              <div
                className={`absolute right-4 h-0 w-0 border-x-[6px] border-x-transparent ${outerCaretClasses}`}
              />
              <div
                className={`absolute right-4 h-0 w-0 border-x-[6px] border-x-transparent ${innerCaretClasses}`}
              />
            </>
          ) : null}
          {locales.map((l) => {
            const config = localeConfig[l];
            const isActive = l === locale;
            const { Flag } = config;

            return (
              <button
                key={l}
                type="button"
                onClick={() => handleLocaleChange(l)}
                disabled={isPending}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  isPending ? "opacity-60" : ""
                } ${isActive ? "bg-theme-light " : "hover:bg-theme-light "}`}
                role="menuitemradio"
                aria-checked={isActive}
              >
                <div className="mt-0.5">
                  <Flag />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-dark ">
                    {t(config.labelKey)}
                  </span>
                  <span className="block text-xs text-text-light ">
                    {t(config.langKey)} · {config.currency}
                  </span>
                </div>
                {isActive ? (
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
