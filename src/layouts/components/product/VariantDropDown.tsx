"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductOption } from "@/lib/shopify/types";

interface VariantDropDownProps {
  sizeOption: ProductOption;
  options?: ProductOption[];
}

const VariantDropDown = ({ sizeOption }: VariantDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select One");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateUrl = (param: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(param.toLowerCase(), value);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;

    // Replace the URL without reloading the page
    window.history.replaceState({}, "", newUrl);
  };

  const handleSizeChanged = (value: string) => {
    setSelected(value);
    updateUrl(sizeOption.name, value);
    setIsOpen(false);
  };

  useEffect(() => {
    const setInitialSizeFromUrl = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const sizeParam = searchParams.get(sizeOption.name.toLowerCase());
      if (sizeParam && sizeOption.values.includes(sizeParam)) {
        setSelected(sizeParam);
      }
    };

    setInitialSizeFromUrl();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sizeOption]);

  const buttonId = `variant-dropdown-${sizeOption.name.toLowerCase()}`;
  const listId = `${buttonId}-list`;

  return (
    <div className="w-72 relative" ref={dropdownRef}>
      <button
        id={buttonId}
        type="button"
        className="w-full py-2.5 pl-4 pr-10 text-left bg-light dark:bg-darkmode-light rounded-2xl cursor-pointer text-sm md:text-base text-text-dark dark:text-darkmode-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-darkmode-primary/50 transition-all font-medium min-h-[44px]"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-label={`Seleziona ${sizeOption.name}`}
      >
        <span className="block truncate">{selected}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={`h-5 w-5 text-text-dark dark:text-darkmode-text-dark transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
        </span>
      </button>

      {isOpen && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={buttonId}
          className="absolute z-20 mt-2 max-h-60 w-full bg-white dark:bg-darkmode-body shadow-lg rounded-2xl overflow-auto ring-1 ring-border dark:ring-darkmode-border focus:outline-none"
        >
          {sizeOption?.values?.map((size: string) => (
            <li
              key={size}
              role="option"
              aria-selected={selected === size}
              className="py-2.5 px-4 cursor-pointer hover:bg-primary/10 dark:hover:bg-darkmode-primary/10 focus:bg-primary/10 dark:focus:bg-darkmode-primary/10 focus:outline-none text-text-dark dark:text-darkmode-text-dark text-sm md:text-base transition-colors border-b border-border/20 dark:border-darkmode-border/20 last:border-b-0 min-h-[44px] flex items-center"
              onClick={() => handleSizeChanged(size)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSizeChanged(size);
                }
              }}
              tabIndex={0}
            >
              {size}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VariantDropDown;
