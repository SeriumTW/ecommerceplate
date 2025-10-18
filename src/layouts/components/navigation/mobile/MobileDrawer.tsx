"use client";

import Logo from "@/components/Logo";
import { fetchUser } from "@/components/NavUser";
import SearchBar from "@/components/SearchBar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import type config from "@/config/config.json";
import type { NavigationLink } from "@/types/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { LuArrowRight, LuX } from "react-icons/lu";
import Gravatar from "react-gravatar";

type DrawerCustomer = Awaited<ReturnType<typeof fetchUser>>;

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  menuItems: NavigationLink[];
  navigationButton: {
    enable: boolean;
    label: string;
    link: string;
  };
  settings: typeof config.settings;
}

const useDrawerCustomer = (open: boolean) => {
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
      try {
        const data = await fetchUser();
        if (isActive) {
          setCustomer(data);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    void loadCustomer();

    return () => {
      isActive = false;
    };
  }, [open, pathname]);

  return { customer, setCustomer, loading } as const;
};

const MobileDrawerUserSection: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { customer, setCustomer, loading } = useDrawerCustomer(open);

  const handleLogout = () => {
    Cookies.remove("token");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("user");
    }
    setCustomer(null);
    onClose();
  };

  const greetingName = useMemo(
    () => customer?.firstName?.split(" ")?.[0] ?? "Shopper",
    [customer?.firstName],
  );

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

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  menuItems,
  navigationButton,
  settings,
}) => {
  const filteredMenuItems = menuItems.filter((item) => !item.hiddenOnMobile);

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
                <Suspense fallback={null}>
                  <SearchBar
                    placeholder="Cerca tra prodotti e collezioni..."
                    inputId="mobile-drawer-search"
                    autoFocusOnMount={open}
                  />
                </Suspense>
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

export default MobileDrawer;
