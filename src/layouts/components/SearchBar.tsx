"use client";

import { useRouter } from "@/i18n/navigation";
import { createUrl } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { useTranslations } from "next-intl";

type SearchBarProps = {
  placeholder?: string;
  inputId?: string;
  autoFocusOnMount?: boolean;
};

const SearchBar = ({
  placeholder,
  inputId = "searchInput",
  autoFocusOnMount = false,
}: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isInputEditing, setInputEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const t = useTranslations("searchBar");

  // Sincronizza inputValue con il parametro URL quando cambia
  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    setInputValue(urlQuery);
  }, [searchParams]);

  useEffect(() => {
    const inputField = document.getElementById(
      inputId,
    ) as HTMLInputElement | null;
    if (!inputField) return;

    if (autoFocusOnMount || isInputEditing || searchParams.get("q")) {
      inputField.focus();
    }
  }, [searchParams, isInputEditing, autoFocusOnMount, inputId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEditing(true);
    setInputValue(e.target.value);
    // Non eseguire ricerca durante la digitazione
  };

  const handleClear = () => {
    setInputValue("");
    setInputEditing(false);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("q");

    router.push(createUrl("/products", newParams));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputEditing(false);

    const newParams = new URLSearchParams(searchParams.toString());

    if (inputValue.trim()) {
      newParams.set("q", inputValue.trim());
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/products", newParams));
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`border border-border  rounded-full flex bg-light/90  pl-4 relative focus-within:ring-2 focus-within:ring-primary/50  focus-within:border-primary  transition-all`}
      role="search"
      aria-label={t("searchProducts")}
    >
      <label htmlFor={inputId} className="sr-only">
        {t("searchProducts")}
      </label>
      <input
        id={inputId}
        className="bg-transparent border-none search-input focus:ring-0 focus:outline-none p-2 w-full"
        type="search"
        name="search"
        placeholder={placeholder ?? t("placeholder")}
        autoComplete="off"
        value={inputValue}
        onChange={handleChange}
        aria-label={t("searchInputField")}
      />
      {inputValue && (
        <button
          type="button"
          className="p-2 m-1 rounded-full hover:bg-primary/10  focus:outline-none focus:ring-2 focus:ring-primary/50  transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={handleClear}
          aria-label={t("clearSearch")}
        >
          <IoClose size={20} aria-hidden="true" />
        </button>
      )}
      <button
        type="submit"
        className="search-icon p-2 m-1 rounded-full hover:bg-primary/10  focus:outline-none focus:ring-2 focus:ring-primary/50  transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label={t("submitSearch")}
      >
        <IoSearch size={20} aria-hidden="true" />
      </button>
    </form>
  );
};

export default SearchBar;
