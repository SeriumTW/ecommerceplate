"use client";

import Logo from "@/components/Logo";
import NavUser, { fetchUser } from "@/components/NavUser";
import SearchBar from "@/components/SearchBar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import { LuArrowRight, LuMenu, LuX } from "react-icons/lu";
import Gravatar from "react-gravatar";
import { BsPerson } from "react-icons/bs";

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
    <div className="hidden lg:block bg-primary-muted text-xs text-text-dark dark:bg-darkmode-light/30 dark:text-darkmode-text">
      <div className="container flex flex-col items-center justify-center gap-2 py-2 text-center sm:flex-row sm:justify-between sm:gap-3 sm:text-left">
        <div className="flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.2em] sm:justify-start">
          <span className="h-2 w-2 rounded-full bg-support-1 dark:bg-support-1" />
          {message}
        </div>
        {links?.length ? (
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium sm:gap-x-6">
            {links.map(({ label, url }) => (
              <Link
                key={label}
                href={url}
                className="transition text-support-1 hover:text-primary hover:underline"
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
            <SearchBar
              placeholder="Cerca prodotti..."
              inputId="header-search"
            />
          </div>
        ) : null}

        {navigationButton?.enable ? (
          <Link
            href={navigationButton.link}
            className="btn btn-outline-primary"
          >
            {navigationButton.label}
          </Link>
        ) : null}

        {settings.theme_switcher ? (
          <ThemeSwitcher className="hidden lg:inline-flex" />
        ) : null}

        {settings.account ? <NavUser /> : null}

        <div className="flex items-center pb-[1.5px]">
          <Suspense fallback={cartFallback}>{cartContent}</Suspense>
        </div>
      </div>
    </div>
  );
};

const MobileHeaderRow = ({
  onToggleDrawer,
  cartFallback,
  cartContent,
}: {
  onToggleDrawer: () => void;
  cartFallback: React.ReactNode;
  cartContent: React.ReactNode;
}) => (
  <div className="flex items-center justify-between lg:hidden">
    <div className="flex items-center">
      <div className="origin-left scale-[0.80]">
        <Logo />
      </div>
    </div>

    <div className="flex items-center justify-between gap-8">
      <div className="flex items-center scale-125">
        <Suspense fallback={cartFallback}>{cartContent}</Suspense>
      </div>
      <button
        type="button"
        onClick={onToggleDrawer}
        aria-label="Apri navigazione"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-border text-2xl text-text-dark transition hover:border-primary/40 hover:text-primary dark:border-darkmode-border dark:text-darkmode-text dark:hover:border-darkmode-primary/40 dark:hover:text-darkmode-primary"
      >
        <LuMenu />
      </button>
    </div>
  </div>
);

type DrawerCustomer = Awaited<ReturnType<typeof fetchUser>>;

const MobileDrawerUserSection = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const [customer, setCustomer] = useState<DrawerCustomer | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    let isActive = true;
    setLoading(true);

    const loadCustomer = async () => {
      const data = await fetchUser();
      if (isActive) {
        setCustomer(data);
        setLoading(false);
      }
    };

    void loadCustomer();

    return () => {
      isActive = false;
    };
  }, [open, pathname]);

  const handleLogout = () => {
    Cookies.remove("token");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("user");
    }
    setCustomer(null);
    onClose();
  };

  const greetingName = customer?.firstName?.split(" ")?.[0] ?? "Shopper";

  return (
    <section className="space-y-5 rounded-2xl border border-border/60 bg-white/95 p-6 shadow-md dark:border-darkmode-border/60 dark:bg-darkmode-light/20">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-border/40 bg-white dark:border-darkmode-border/50 dark:bg-darkmode-light/30">
          {customer ? (
            <Gravatar
              email={customer.email ?? ""}
              className="h-full w-full object-cover"
              style={{ borderRadius: "9999px" }}
            />
          ) : (
            <BsPerson className="text-4xl text-primary dark:text-darkmode-primary" />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-lg font-semibold text-text-dark dark:text-darkmode-text">
            {customer ? `Ciao, ${greetingName}!` : "Area clienti"}
          </p>
          <p className="text-sm text-text-light dark:text-darkmode-text/70">
            {customer
              ? customer.email
              : "Accedi per monitorare ordini e dati di consegna."}
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-base font-medium text-text-light dark:text-darkmode-text/60">
          Recupero del profilo in corso...
        </p>
      ) : customer ? (
        <div className="grid gap-3">
          <Link
            href="/account"
            onClick={onClose}
            className="btn btn-outline-primary justify-center text-center py-3 text-base"
          >
            Vai all&apos;account
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-primary justify-center text-center py-3 text-base"
          >
            Esci
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          <Link
            href="/login"
            onClick={onClose}
            className="btn btn-primary justify-center text-center py-3 text-base"
          >
            Accedi
          </Link>
          <Link
            href="/sign-up"
            onClick={onClose}
            className="btn btn-outline-primary justify-center text-center py-3 text-base"
          >
            Crea account
          </Link>
        </div>
      )}
    </section>
  );
};

const MobileDrawer = ({
  open,
  onClose,
  menuItems,
  navigationButton,
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
  settings: typeof config.settings;
}) => {
  const filteredMenuItems = menuItems.filter(
    (item) => item.name?.toLowerCase() !== "pages",
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-0 z-50 flex h-full w-full transform flex-col bg-body/95 backdrop-blur transition-transform duration-300 dark:bg-darkmode-body/95 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 dark:border-darkmode-border/60">
          <div className="flex items-center">
            <div className="origin-left scale-[0.80]">
              <Logo />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {settings.theme_switcher ? (
              <ThemeSwitcher className="!h-14 !w-14 !text-2xl" />
            ) : null}

            <button
              type="button"
              className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-border text-2xl transition hover:border-primary/40 hover:text-primary dark:border-darkmode-border dark:text-darkmode-text dark:hover:border-darkmode-primary/40 dark:hover:text-darkmode-primary"
              onClick={onClose}
              aria-label="Chiudi navigazione"
            >
              <LuX />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-12 pt-8">
          <div className="space-y-10">
            {settings.search ? (
              <section className="space-y-5 rounded-2xl border border-border/50 bg-white/95 p-6 shadow-md dark:border-darkmode-border/60 dark:bg-darkmode-light/20">
                <p className="text-base font-semibold uppercase tracking-[0.3em] text-primary/70 dark:text-darkmode-primary">
                  Cerca nel catalogo
                </p>
                <SearchBar
                  placeholder="Cerca tra prodotti e collezioni..."
                  inputId="mobile-drawer-search"
                  autoFocusOnMount={open}
                />
              </section>
            ) : null}

            {settings.account ? (
              <MobileDrawerUserSection open={open} onClose={onClose} />
            ) : null}

            <nav className="space-y-4">
              {filteredMenuItems.map((item) => (
                <div key={item.name} className="space-y-4">
                  <Link
                    href={item.url || "#"}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 text-lg font-semibold text-text-dark shadow-sm transition hover:bg-primary/10 hover:text-primary dark:bg-darkmode-light/20 dark:text-darkmode-text dark:hover:bg-darkmode-primary/20 dark:hover:text-darkmode-primary"
                  >
                    {item.name}
                    <LuArrowRight className="text-base opacity-60" />
                  </Link>
                  {item.children?.length ? (
                    <ul className="ml-4 border-l border-border/40 pl-4 dark:border-darkmode-border/40">
                      {item.children.map((child) => (
                        <li key={child.url} className="py-2">
                          <Link
                            href={child.url}
                            onClick={onClose}
                            className="text-base text-text-light transition hover:text-primary dark:text-darkmode-text dark:hover:text-darkmode-primary"
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
        </div>

        {navigationButton?.enable ? (
          <div className="border-t border-border/60 px-6 py-8 dark:border-darkmode-border/60">
            <Link
              href={navigationButton.link}
              onClick={onClose}
              className="btn btn-outline-primary w-full py-4 text-lg"
            >
              {navigationButton.label}
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
};

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const childArray = React.Children.toArray(children);
  const cartFallback = childArray[0] ?? null;
  const cartContent = childArray[1] ?? null;

  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings, header_topbar } = config;

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

  useEffect(() => {
    if (isDrawerOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

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
        <div className="container space-y-3 py-2 lg:space-y-5 lg:py-5">
          <MobileHeaderRow
            onToggleDrawer={() => setIsDrawerOpen((prev) => !prev)}
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
        settings={settings}
      />
    </header>
  );
};

export default Header;
