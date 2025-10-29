"use client";

import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

type SearchBarProps = {
  placeholder?: string;
  inputId?: string;
  autoFocusOnMount?: boolean;
};

const SearchBar = ({
  placeholder = "Search for products",
  inputId = "searchInput",
  autoFocusOnMount = false,
}: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isInputEditing, setInputEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

    const newParams = new URLSearchParams(searchParams.toString());

    if (e.target.value) {
      newParams.set("q", e.target.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/products", newParams), { scroll: false });
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

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/products", newParams));
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`border border-border dark:border-darkmode-border rounded-full flex bg-light/90 dark:bg-dark/10 pl-4 relative focus-within:ring-2 focus-within:ring-primary/50 dark:focus-within:ring-darkmode-primary/50 focus-within:border-primary dark:focus-within:border-darkmode-primary transition-all`}
      role="search"
      aria-label="Cerca prodotti"
    >
      <label htmlFor={inputId} className="sr-only">
        Cerca prodotti
      </label>
      <input
        id={inputId}
        className="bg-transparent border-none search-input focus:ring-0 focus:outline-none p-2 w-full"
        key={searchParams?.get("q")}
        type="search"
        name="search"
        placeholder={placeholder}
        autoComplete="off"
        value={inputValue}
        onChange={handleChange}
        aria-label="Campo di ricerca prodotti"
      />
      {inputValue && (
        <button
          type="button"
          className="p-2 m-1 rounded-full hover:bg-primary/10 dark:hover:bg-darkmode-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-darkmode-primary/50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={handleClear}
          aria-label="Cancella ricerca"
        >
          <IoClose size={20} aria-hidden="true" />
        </button>
      )}
      <button
        type="submit"
        className="search-icon p-2 m-1 rounded-full hover:bg-primary/10 dark:hover:bg-darkmode-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-darkmode-primary/50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Esegui ricerca"
      >
        <IoSearch size={20} aria-hidden="true" />
      </button>
    </form>
  );
};

export default SearchBar;
