"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { ListItem } from "../product/ProductLayouts";
import { FilterDropdownItem } from "./FilterDropdownItem";

const DropdownMenu = ({ list }: { list: ListItem[] }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");

  const [openSelect, setOpenSelect] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    list.forEach((listItem: ListItem) => {
      if (
        ("path" in listItem && pathname === listItem.path) ||
        ("slug" in listItem && searchParams.get("sort") === listItem.slug)
      ) {
        setActive(listItem.title);
      }
    });
  }, [pathname, list, searchParams]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        className="inline-flex w-full justify-center items-center gap-2 rounded-2xl bg-white dark:bg-darkmode-body border border-border dark:border-darkmode-border px-4 py-2.5 text-sm font-semibold text-text dark:text-darkmode-text hover:border-primary dark:hover:border-darkmode-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-darkmode-primary/50 transition-colors cursor-pointer shadow-sm min-h-[44px]"
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
        id="menu-button"
        aria-haspopup="true"
        aria-expanded={openSelect}
        aria-controls="filter-menu"
      >
        <div>{active}</div>
        <svg
          className={`h-4 w-4 transform ${
            openSelect ? "rotate-180" : ""
          } transition-transform`}
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
      </button>

      {openSelect && (
        <div
          id="filter-menu"
          className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl bg-white dark:bg-darkmode-body border border-border dark:border-darkmode-border shadow-2xl focus:outline-none overflow-hidden"
          onClick={() => {
            setOpenSelect(false);
          }}
        >
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            {list.map((item: ListItem, i) => (
              <Suspense key={i}>
                <FilterDropdownItem item={item} />
              </Suspense>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
