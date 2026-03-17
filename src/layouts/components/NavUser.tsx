"use client";

import type { user } from "@/lib/shopify/types";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import Gravatar from "react-gravatar";
import { BsPerson } from "react-icons/bs";
import { useTranslations } from "next-intl";

type Customer = user["customer"] | null;

const fetchMe = async (): Promise<Customer> => {
  try {
    const response = await fetch("/api/customer/me", {
      credentials: "same-origin",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { customer: Customer };
    return data.customer ?? null;
  } catch (cause) {
    console.error("Error fetching user details:", cause);
    return null;
  }
};

export const fetchUser = async () => {
  try {
    return await fetchMe();
  } catch {
    return null;
  }
};

const NavUser = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<Customer>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("nav");

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await fetchUser();
      setUser(userInfo);
    };

    getUser();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (dropdownOpen) {
      window.addEventListener("click", handleClickOutside);
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    try {
      await fetch("/api/customer/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      setUser(null);
      setDropdownOpen(false);
      router.refresh();
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const buttonId = "nav-user-button";
  const menuId = "nav-user-menu";

  return (
    <div className="relative">
      {user ? (
        <>
          <button
            ref={buttonRef}
            id={buttonId}
            onClick={toggleDropdown}
            className="flex items-center gap-2 rounded-2xl border border-border  px-3 py-2 text-sm font-medium text-text-dark  hover:border-primary  focus:outline-none focus:ring-2 focus:ring-primary/50  transition-colors min-h-[44px]"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-controls={menuId}
            aria-label={t("userMenu")}
          >
            <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-border ">
              <Gravatar
                email={user?.email ?? ""}
                style={{ borderRadius: "50px" }}
                key={user?.email}
              />
            </div>
            <div className="leading-none max-md:hidden">
              <div className="flex items-center gap-1">
                <p className="block text-sm font-medium truncate max-w-[100px]">
                  {user?.firstName?.split(" ")[0]}
                </p>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </button>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              id={menuId}
              className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl bg-white  border border-border  shadow-2xl focus:outline-none overflow-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={buttonId}
            >
              <div className="py-2">
                <div className="px-4 py-3 border-b border-border/20 ">
                  <p className="text-sm font-semibold text-text-dark  truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-text-light  truncate mt-1">
                    {user?.email}
                  </p>
                </div>

                <Link
                  href="/account"
                  className="block px-4 py-3 text-sm text-text-dark  hover:bg-primary/10  focus:bg-primary/10  focus:outline-none transition-colors"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  {t("myAccount")}
                </Link>

                <Link
                  href="/orders"
                  className="block px-4 py-3 text-sm text-text-dark  hover:bg-primary/10  focus:bg-primary/10  focus:outline-none transition-colors"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  {t("myOrders")}
                </Link>

                <div className="border-t border-border/20  my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-error  hover:bg-error/10  focus:bg-error/10  focus:outline-none transition-colors"
                  role="menuitem"
                >
                  {t("logout")}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          className="inline-flex items-center justify-center rounded-2xl border border-border  px-3 py-2 text-xl text-text-dark hover:text-primary   hover:border-primary  focus:outline-none focus:ring-2 focus:ring-primary/50  transition-colors min-h-[44px] min-w-[44px]"
          href="/login"
          aria-label={t("loginToAccount")}
        >
          <BsPerson />
        </Link>
      )}
    </div>
  );
};

export default NavUser;
