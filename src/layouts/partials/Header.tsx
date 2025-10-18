"use client";

import Logo from "@/components/Logo";
import DesktopNavigation from "@/components/navigation/DesktopNavigation";
import HeaderTopBar from "@/components/navigation/HeaderTopBar";
import MobileDrawer from "@/components/navigation/mobile/MobileDrawer";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import type { NavigationLink, TopBarLink } from "@/types/navigation";
import useHeaderState from "@/hooks/useHeaderState";
import React, { Suspense, useMemo } from "react";
import { LuMenu } from "react-icons/lu";

interface HeaderCartProps {
  cartFallback: React.ReactNode;
  cartContent: React.ReactNode;
}

const MobileHeaderRow = ({
  onToggleDrawer,
  cartFallback,
  cartContent,
}: HeaderCartProps & { onToggleDrawer: () => void }) => (
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

const Header: React.FC<HeaderCartProps> = ({ cartFallback, cartContent }) => {
  const { main }: { main: NavigationLink[] } = menu;
  const { navigation_button, settings, header_topbar } = config;

  const { pathname, isDrawerOpen, navbarShadow, toggleDrawer, closeDrawer } =
    useHeaderState();

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
            onToggleDrawer={toggleDrawer}
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
        onClose={closeDrawer}
        menuItems={main}
        navigationButton={navigation_button}
        settings={settings}
      />
    </header>
  );
};

export default Header;
