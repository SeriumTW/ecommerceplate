"use client";

import Logo from "@/components/Logo";
import NavUser from "@/components/NavUser";
import SearchBar from "@/components/SearchBar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import {
  LuArrowRight,
  LuChevronDown,
  LuMenu,
  LuSparkles,
  LuX,
} from "react-icons/lu";

interface IChildNavigationLink {
  name: string;
  url: string;
}

interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

interface TopBarLink {
  label: string;
  url: string;
}

const isMenuItemActive = (
  item: Pick<INavigationLink, "url"> | IChildNavigationLink,
  pathname: string,
) => {
  if (!item.url) {
    return false;
  }

  const normalizedPath = item.url.endsWith("/") ? item.url : `${item.url}/`;
  return pathname === item.url || pathname === normalizedPath;
};

const menuDescriptions: Record<string, string> = {
  Home: "Dai un’occhiata alle ultime novità in homepage.",
  Products: "Tutto il catalogo pet-friendly diviso per collezioni.",
  Pages: "Scopri informazioni utili, contatti e policy del negozio.",
  Contact: "Hai bisogno di aiuto? Il nostro team è a tua disposizione.",
};

const HeaderTopBar = ({
  message,
  links,
}: {
  message: string;
  links: TopBarLink[];
}) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-[#FADADD] text-xs text-text-dark dark:bg-darkmode-light/30 dark:text-darkmode-text">
      <div className="container flex flex-wrap items-center justify-between gap-3 py-2">
        <div className="flex items-center gap-2 font-semibold uppercase tracking-[0.2em]">
          <span className="h-2 w-2 rounded-full bg-primary/80 dark:bg-darkmode-primary" />
          {message}
        </div>
        {links?.length ? (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
            {links.map(({ label, url }) => (
              <Link
                key={label}
                href={url}
                className="transition hover:text-primary hover:underline"
              >
                {label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const DiscoverPanel = ({
  menuItems,
  pathname,
  onNavigate,
  suggestions,
  highlight,
  cta,
}: {
  menuItems: INavigationLink[];
  pathname: string;
  onNavigate: () => void;
  suggestions: string[];
  highlight?: {
    title?: string;
    description?: string;
    badge?: string;
  };
  cta?: {
    enable?: boolean;
    label?: string;
    url?: string;
  };
}) => {
  if (!menuItems.length) {
    return null;
  }

  return (
    <div className="hidden lg:block">
      <div className="absolute inset-x-0 top-full z-30 bg-body/95 py-10 backdrop-blur dark:bg-darkmode-body/95">
        <div className="container grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="flex flex-col gap-4">
            <SearchSection suggestions={suggestions} />
            <HighlightCard
              title={highlight?.title}
              description={highlight?.description}
              badge={highlight?.badge}
              cta={cta}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="group rounded-3xl border border-border/40 bg-white/90 p-6 shadow-lg/10 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl dark:border-darkmode-border/60 dark:bg-darkmode-light/30 dark:hover:border-darkmode-primary/60"
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={item.url || "#"}
                    className={`text-lg font-semibold transition hover:text-primary ${isMenuItemActive(item, pathname) ? "text-primary" : "text-text-dark dark:text-darkmode-text"}`}
                    onClick={onNavigate}
                  >
                    {item.name}
                  </Link>
                  <LuSparkles className="text-primary/70 dark:text-darkmode-primary" />
                </div>

                <p className="mt-2 text-sm text-text-light dark:text-darkmode-text">
                  {menuDescriptions[item.name] ??
                    "Esplora questa sezione per scoprire nuove idee."}
                </p>

                {item.children?.length ? (
                  <ul className="mt-4 space-y-2 text-sm">
                    {item.children.map((child) => (
                      <li key={child.url}>
                        <Link
                          href={child.url}
                          className={`flex items-center justify-between rounded-full bg-light/60 px-4 py-2 text-text-dark transition hover:bg-primary/10 hover:text-primary dark:bg-darkmode-light/30 dark:text-darkmode-text dark:hover:bg-darkmode-primary/20 dark:hover:text-darkmode-primary ${isMenuItemActive(child, pathname) ? "bg-primary/10 text-primary dark:bg-darkmode-primary/20 dark:text-darkmode-primary" : ""}`}
                          onClick={onNavigate}
                        >
                          <span>{child.name}</span>
                          <LuArrowRight className="text-xs opacity-70" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchSection = ({
  suggestions,
}: {
  suggestions: string[];
}) => {
  return (
    <div className="rounded-3xl border border-border/60 bg-light/80 px-6 py-6 shadow-sm dark:border-darkmode-border/60 dark:bg-darkmode-light/10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80 dark:text-darkmode-primary">
            Cerca il regalo perfetto per il tuo pet
          </p>
          <p className="mt-2 text-base text-text-dark dark:text-darkmode-text">
            Suggerimenti personalizzati e prodotti selezionati per ogni esigenza.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <SearchBar placeholder="Cerca snack, cucce, giochi..." />
      </div>

      {suggestions?.length ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {suggestions.map((suggestion) => (
            <Link
              key={suggestion}
              href={`/products?q=${encodeURIComponent(suggestion)}`}
              className="rounded-full border border-transparent bg-white px-4 py-2 text-sm font-medium text-text-light shadow-sm transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary dark:bg-darkmode-body/80 dark:text-darkmode-text dark:hover:bg-darkmode-primary/20 dark:hover:text-darkmode-primary"
            >
              {suggestion}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const HighlightCard = ({
  title,
  description,
  badge,
  cta,
  variant = "default",
}: {
  title?: string;
  description?: string;
  badge?: string;
  cta?: { enable?: boolean; label?: string; url?: string };
  variant?: "default" | "compact";
}) => {
  if (!title && !description) {
    return null;
  }

  const isCompact = variant === "compact";
  const wrapperClasses = isCompact
    ? "relative overflow-hidden rounded-2xl border border-primary/15 bg-primary/10 px-5 py-5 text-text-dark shadow-sm dark:border-darkmode-primary/30 dark:bg-darkmode-primary/10 dark:text-darkmode-text"
    : "relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/10 px-6 py-6 text-text-dark shadow-sm dark:border-darkmode-primary/30 dark:bg-darkmode-primary/10 dark:text-darkmode-text";
  const titleClasses = isCompact
    ? "mt-2 text-xl font-semibold text-text-dark dark:text-white"
    : "mt-3 text-2xl font-semibold text-text-dark dark:text-white";
  const descriptionClasses = isCompact
    ? "mt-2 text-sm text-text-light dark:text-darkmode-text"
    : "mt-3 text-sm text-text-light dark:text-darkmode-text";
  const badgeClasses = isCompact
    ? "mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm dark:bg-darkmode-body/80 dark:text-darkmode-primary"
    : "mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm dark:bg-darkmode-body/80 dark:text-darkmode-primary";
  const buttonClasses = isCompact
    ? "btn btn-primary mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm"
    : "btn btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm";

  return (
    <div className={wrapperClasses}>
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-3xl dark:bg-darkmode-primary/30" />
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80 dark:text-darkmode-primary">
        Novità dal negozio
      </p>
      <h3 className={titleClasses}>
        {title}
      </h3>
      {description ? (
        <p className={descriptionClasses}>
          {description}
        </p>
      ) : null}

      {badge ? (
        <div className={badgeClasses}>
          {badge}
        </div>
      ) : null}

      {cta?.enable && cta.label && cta.url ? (
        <Link
          href={cta.url}
          className={buttonClasses}
        >
          {cta.label}
          <LuArrowRight className="text-base" />
        </Link>
      ) : null}
    </div>
  );
};

const DesktopNavigation = ({
  menuItems,
  pathname,
  isMegaOpen,
  onMegaToggle,
  navigationButton,
}: {
  menuItems: INavigationLink[];
  pathname: string;
  isMegaOpen: boolean;
  onMegaToggle: () => void;
  navigationButton: {
    enable: boolean;
    label: string;
    link: string;
  };
}) => {
  return (
    <div className="hidden items-center gap-4 lg:flex">
      <button
        type="button"
        onClick={onMegaToggle}
        aria-expanded={isMegaOpen}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isMegaOpen ? "border-primary bg-primary text-white shadow-lg hover:bg-primary/90" : "border-border bg-white text-text-dark shadow-sm hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg dark:border-darkmode-border dark:bg-darkmode-light/20 dark:text-darkmode-text dark:hover:border-darkmode-primary/40"}`}
      >
        <LuSparkles className={isMegaOpen ? "text-white" : "text-primary"} />
        Catalogo
        <LuChevronDown
          className={`transition ${isMegaOpen ? "rotate-180" : ""}`}
        />
      </button>

      <nav className="flex items-center gap-2 text-sm font-semibold">
        {menuItems.map((item) => (
          <React.Fragment key={item.name}>
            {!item.hasChildren ? (
              <Link
                href={item.url || "#"}
                className={`rounded-full px-4 py-2 transition hover:bg-primary/10 hover:text-primary dark:hover:bg-darkmode-primary/20 dark:hover:text-darkmode-primary ${isMenuItemActive(item, pathname) ? "bg-primary/10 text-primary dark:bg-darkmode-primary/20 dark:text-darkmode-primary" : "text-text-dark dark:text-darkmode-text"}`}
              >
                {item.name}
              </Link>
            ) : null}
          </React.Fragment>
        ))}
      </nav>

      {navigationButton?.enable ? (
        <Link href={navigationButton.link} className="btn btn-outline-primary">
          {navigationButton.label}
        </Link>
      ) : null}
    </div>
  );
};

const MobileHeaderRow = ({
  onToggleDrawer,
  navigationButton,
  settings,
  cartFallback,
  cartContent,
}: {
  onToggleDrawer: () => void;
  navigationButton: {
    enable: boolean;
    label: string;
    link: string;
  };
  settings: typeof config.settings;
  cartFallback: React.ReactNode;
  cartContent: React.ReactNode;
}) => (
  <div className="flex items-center justify-between lg:hidden">
    <button
      type="button"
      onClick={onToggleDrawer}
      aria-label="Apri navigazione"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-xl text-text-dark transition hover:border-primary/40 hover:text-primary dark:border-darkmode-border dark:text-darkmode-text dark:hover:border-darkmode-primary/40 dark:hover:text-darkmode-primary"
    >
      <LuMenu />
    </button>

    <Logo />

    <div className="flex items-center gap-4">
      {settings.theme_switcher ? (
        <ThemeSwitcher className="hidden md:flex" />
      ) : null}

      {settings.account ? <NavUser /> : null}

      <div className="relative">
        <Suspense fallback={cartFallback}>{cartContent}</Suspense>
      </div>

      {navigationButton?.enable ? (
        <Link
          href={navigationButton.link}
          className="hidden rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white dark:border-darkmode-primary dark:text-darkmode-primary dark:hover:bg-darkmode-primary/20 lg:inline-flex"
        >
          {navigationButton.label}
        </Link>
      ) : null}
    </div>
  </div>
);

const MobileDrawer = ({
  open,
  onClose,
  menuItems,
  navigationButton,
  headerCta,
  highlight,
  settings,
}: {
  open: boolean;
  onClose: () => void;
  menuItems: INavigationLink[];
  navigationButton: {
    enable: boolean;
    label: string;
    link: string;
  };
  headerCta?: {
    enable?: boolean;
    label?: string;
    url?: string;
  };
  highlight?: {
    title?: string;
    description?: string;
    badge?: string;
  };
  settings: typeof config.settings;
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-full max-w-sm transform flex-col border-r border-border bg-body transition-transform duration-300 dark:border-darkmode-border dark:bg-darkmode-body ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/70 dark:border-darkmode-border/60">
          <Logo />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-xl transition hover:border-primary/40 hover:text-primary dark:border-darkmode-border dark:text-darkmode-text dark:hover:border-darkmode-primary/40 dark:hover:text-darkmode-primary"
            onClick={onClose}
            aria-label="Chiudi navigazione"
          >
            <LuX />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {settings.search ? (
            <div className="rounded-2xl border border-border/40 bg-light/60 p-4 dark:border-darkmode-border/50 dark:bg-darkmode-light/10">
              <SearchBar placeholder="Cerca subito..." />
            </div>
          ) : null}

          {(highlight?.title || highlight?.description) && (
            <div className="mt-5">
              <HighlightCard
                title={highlight?.title}
                description={highlight?.description}
                badge={highlight?.badge}
                cta={headerCta}
                variant="compact"
              />
            </div>
          )}

          <nav className="mt-6 space-y-4">
            {menuItems.map((item) => (
              <div key={item.name} className="space-y-2">
                <Link
                  href={item.url || "#"}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-base font-semibold text-text-dark shadow-sm transition hover:bg-primary/10 hover:text-primary dark:bg-darkmode-light/20 dark:text-darkmode-text dark:hover:bg-darkmode-primary/20 dark:hover:text-darkmode-primary"
                >
                  {item.name}
                  <LuArrowRight className="text-sm opacity-60" />
                </Link>
                {item.children?.length ? (
                  <ul className="ml-4 border-l border-border/40 pl-4 dark:border-darkmode-border/40">
                    {item.children.map((child) => (
                      <li key={child.url} className="py-1">
                        <Link
                          href={child.url}
                          onClick={onClose}
                          className="text-sm text-text-light transition hover:text-primary dark:text-darkmode-text dark:hover:text-darkmode-primary"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </nav>
        </div>

        <div className="px-6 pb-8">
          {navigationButton?.enable ? (
            <Link
              href={navigationButton.link}
              onClick={onClose}
              className="btn btn-outline-primary mb-3 w-full"
            >
              {navigationButton.label}
            </Link>
          ) : null}
          {headerCta?.enable &&
          headerCta.label &&
          headerCta.url &&
          !(highlight?.title || highlight?.description) ? (
            <Link
              href={headerCta.url}
              onClick={onClose}
              className="btn btn-primary w-full rounded-full"
            >
              {headerCta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
};

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const childArray = React.Children.toArray(children);
  const cartFallback = childArray[0] ?? null;
  const cartContent = childArray[1] ?? null;

  const { main }: { main: INavigationLink[] } = menu;
  const {
    navigation_button,
    settings,
    header_topbar,
    header_cta,
    header_highlight,
  } = config;

  const pathname = usePathname();
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [navbarShadow, setNavbarShadow] = useState(false);

  const closeAllOverlays = useCallback(() => {
    setIsMegaOpen(false);
    setIsDrawerOpen(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    closeAllOverlays();
  }, [pathname, closeAllOverlays]);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const suggestionList = useMemo(
    () => header_highlight?.suggestions ?? [],
    [header_highlight?.suggestions],
  );

  const topBarLinks = useMemo<TopBarLink[]>(
    () => header_topbar?.links ?? [],
    [header_topbar?.links],
  );

  return (
    <header
      className={`header relative z-40 ${settings.sticky_header ? "sticky top-0" : ""} ${navbarShadow ? "shadow-md" : ""}`}
    >
      {header_topbar?.enable && (
        <HeaderTopBar message={header_topbar.message} links={topBarLinks} />
      )}

      <div className="relative bg-body/95 backdrop-blur dark:bg-darkmode-body/95">
        <div className="container space-y-4 py-3 lg:space-y-5 lg:py-5">
          <MobileHeaderRow
            onToggleDrawer={() => setIsDrawerOpen((prev) => !prev)}
            navigationButton={navigation_button}
            settings={settings}
            cartFallback={cartFallback}
            cartContent={cartContent}
          />

          <div className="hidden items-center justify-between lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8">
            <div className="flex items-center gap-4">
              <Logo />
              <div className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary/80 dark:bg-darkmode-primary/10 dark:text-darkmode-primary sm:inline-flex">
                LoveBirds Pet Care
              </div>
            </div>

            <DesktopNavigation
              menuItems={main}
              pathname={pathname}
              isMegaOpen={isMegaOpen}
              onMegaToggle={() => setIsMegaOpen((prev) => !prev)}
              navigationButton={navigation_button}
            />

            <div className="hidden items-center gap-4 lg:flex">
              {settings.theme_switcher ? (
                <ThemeSwitcher className="hidden lg:flex" />
              ) : null}
              {settings.account ? <NavUser /> : null}
              <div className="relative">
                <Suspense fallback={cartFallback}>{cartContent}</Suspense>
              </div>
              {header_cta?.enable && header_cta.label && header_cta.url ? (
                <Link
                  href={header_cta.url}
                  className="btn btn-primary rounded-full px-5 py-2 text-sm"
                >
                  {header_cta.label}
                </Link>
              ) : null}
            </div>
          </div>

        </div>

        {isMegaOpen ? (
          <DiscoverPanel
            menuItems={main}
            pathname={pathname}
            onNavigate={() => setIsMegaOpen(false)}
            suggestions={suggestionList}
            highlight={header_highlight}
            cta={header_cta}
          />
        ) : null}
      </div>

      <MobileDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        menuItems={main}
        navigationButton={navigation_button}
        headerCta={header_cta}
        highlight={header_highlight}
        settings={settings}
      />
    </header>
  );
};

export default Header;
