"use client";

import NavUser from "@/components/NavUser";
import SearchBar from "@/components/SearchBar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import type config from "@/config/config.json";
import type { NavigationChildLink, NavigationLink } from "@/types/navigation";
import Link from "next/link";
import React, { Suspense } from "react";

import { isMenuItemActive } from "./utils";

interface NavigationButton {
  enable: boolean;
  label: string;
  link: string;
}

interface DesktopNavigationProps {
  menuItems: NavigationLink[];
  pathname: string;
  navigationButton: NavigationButton;
  settings: typeof config.settings;
  cartFallback: React.ReactNode;
  cartContent: React.ReactNode;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  menuItems,
  pathname,
  navigationButton,
  settings,
  cartFallback,
  cartContent,
}) => {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const enableDropdown = false; // toggle rapido per riabilitare il dropdown desktop

  const baseItemClasses =
    "rounded-full px-4 py-2 transition hover:bg-primary/10 hover:text-primary dark:hover:bg-darkmode-primary/20 dark:hover:text-darkmode-primary";
  const activeItemClasses =
    "bg-primary/10 text-primary dark:bg-darkmode-primary/20 dark:text-darkmode-primary";
  const inactiveItemClasses = "text-text-dark dark:text-darkmode-text";

  const getItemClassName = (isActive: boolean, extraClassName = "") =>
    `${baseItemClasses} ${isActive ? activeItemClasses : inactiveItemClasses} ${extraClassName}`.trim();

  const handleCloseDropdown = React.useCallback(() => {
    setOpenItem(null);
  }, []);

  const renderMenuLink = (
    item: NavigationLink | NavigationChildLink,
    key?: string,
  ) => {
    const isActive = isMenuItemActive(item, pathname);

    return (
      <Link
        key={key ?? item.name}
        href={item.url || "#"}
        className={getItemClassName(isActive)}
      >
        {item.name}
      </Link>
    );
  };

  const renderMenuWithChildren = (item: NavigationLink) => {
    const hasChildren = item.children && item.children.length > 0;

    if (!hasChildren || !enableDropdown) {
      if (hasChildren) {
        const firstChild = item.children?.[0];
        if (firstChild) {
          return renderMenuLink(firstChild, `${item.name}-${firstChild.name}`);
        }
      }

      return renderMenuLink(item);
    }

    const childActive = item.children?.some((child) =>
      isMenuItemActive(child, pathname),
    );
    const isActive = childActive || isMenuItemActive(item, pathname);
    const isOpen = openItem === item.name;

    return (
      <div
        key={item.name}
        className="group relative"
        onMouseEnter={() => setOpenItem(item.name)}
        onMouseLeave={handleCloseDropdown}
        onFocus={() => setOpenItem(item.name)}
        onBlur={(event) => {
          const relatedTarget = event.relatedTarget as Node | null;
          if (!relatedTarget || !event.currentTarget.contains(relatedTarget)) {
            handleCloseDropdown();
          }
        }}
      >
        <button
          type="button"
          className={getItemClassName(
            Boolean(isActive),
            "flex items-center gap-1",
          )}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span>{item.name}</span>
          <svg
            aria-hidden="true"
            focusable="false"
            className="h-4 w-4 transition-transform group-hover:rotate-180"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          className={`absolute left-0 top-full z-20 mt-3 min-w-[200px] rounded-3xl bg-body p-3 shadow-lg/20 transition-all duration-150 dark:bg-darkmode-body ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-2 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {item.children?.map((child) => {
              const childIsActive = isMenuItemActive(child, pathname);

              return (
                <li key={child.name}>
                  <Link
                    href={child.url}
                    className={getItemClassName(
                      childIsActive,
                      "block rounded-2xl text-left text-sm font-medium",
                    )}
                  >
                    {child.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="hidden items-center justify-between gap-6 lg:flex">
      <nav className="flex items-center gap-2 text-sm font-semibold">
        {menuItems.map((item) => {
          if (item.hasChildren) {
            return renderMenuWithChildren(item);
          }

          return renderMenuLink(item);
        })}
      </nav>

      <div className="flex items-center gap-4">
        {settings.search ? (
          <div className="hidden w-96 xl:w-[510px] lg:block">
            <Suspense fallback={null}>
              <SearchBar
                placeholder="Cerca prodotti..."
                inputId="header-search"
              />
            </Suspense>
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

export default DesktopNavigation;
