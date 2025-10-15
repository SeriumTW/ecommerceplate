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
import { LuArrowRight, LuMenu, LuSearch, LuX } from "react-icons/lu";

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
  navigationButton,
  settings,
  cartFallback,
  cartContent,
}: {
  menuItems: INavigationLink[];
  pathname: string;
  navigationButton: {
    enable: boolean;
    label: string;
    link: string;
  };
  settings: typeof config.settings;
  cartFallback: React.ReactNode;
  cartContent: React.ReactNode;
}) => {
  return (
    <div className="hidden items-center justify-between gap-6 lg:flex">
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

      <div className="flex items-center gap-4">
        {settings.search ? (
          <div className="hidden w-96 xl:w-[510px] lg:block">
            <SearchBar placeholder="Cerca prodotti..." inputId="header-search" />
          </div>
        ) : null}

        {navigationButton?.enable ? (
          <Link href={navigationButton.link} className="btn btn-outline-primary">
            {navigationButton.label}
          </Link>
        ) : null}

        {settings.theme_switcher ? (
          <ThemeSwitcher className="hidden lg:inline-flex" />
        ) : null}

        {settings.account ? <NavUser /> : null}

        <div className="relative">
          <Suspense fallback={cartFallback}>{cartContent}</Suspense>
        </div>
      </div>
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
  const { navigation_button, settings, header_topbar, header_highlight } =
    config;

  const pathname = usePathname();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [navbarShadow, setNavbarShadow] = useState(false);

  const closeAllOverlays = useCallback(() => {
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
            </div>

            <DesktopNavigation
              menuItems={main}
              pathname={pathname}
              navigationButton={navigation_button}
              settings={settings}
              cartFallback={cartFallback}
              cartContent={cartContent}
            />

      </div>

    </div>
  </div>

  <MobileDrawer
    open={isDrawerOpen}
    onClose={() => setIsDrawerOpen(false)}
    menuItems={main}
    navigationButton={navigation_button}
    highlight={header_highlight}
    settings={settings}
  />
    </header>
  );
};

export default Header;


