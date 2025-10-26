"use client";

import {
  ProductFilters,
  countActiveFilters,
} from "@/lib/utils/productQueryBuilder";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HiX } from "react-icons/hi";

interface ActiveFiltersProps {
  filters: ProductFilters;
}

export default function ActiveFilters({ filters }: ActiveFiltersProps) {
  const searchParams = useSearchParams();
  const activeCount = countActiveFilters(filters);

  // Se non ci sono filtri attivi, non mostrare nulla
  if (activeCount === 0) return null;

  // Helper per rimuovere un filtro specifico
  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    return `/products?${params.toString()}`;
  };

  // Clear all filters
  const clearAllHref = () => {
    const params = new URLSearchParams(searchParams.toString());
    // Mantieni solo sort e layout
    const sort = params.get("sort");
    const layout = params.get("layout");
    params.forEach((_, key) => params.delete(key));
    if (sort) params.set("sort", sort);
    if (layout) params.set("layout", layout);
    return `/products?${params.toString()}`;
  };

  return (
    <div className="container py-4 border-b border-border/30 dark:border-darkmode-border/30">
      <div className="flex items-center flex-wrap gap-3">
        <span className="text-sm font-medium text-text-dark dark:text-darkmode-text-dark">
          Filtri attivi ({activeCount}):
        </span>

        {/* Chip filtro ricerca */}
        {filters.searchValue && (
          <FilterChip
            label={`Cerca: "${filters.searchValue}"`}
            href={removeFilter("q")}
          />
        )}

        {/* Chip filtro prezzo */}
        {(filters.minPrice || filters.maxPrice) && (
          <FilterChip
            label={`Prezzo: ${filters.minPrice || "0"}€ - ${filters.maxPrice || "∞"}€`}
            href={(() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("minPrice");
              params.delete("maxPrice");
              return `/products?${params.toString()}`;
            })()}
          />
        )}

        {/* Chip filtro brand */}
        {filters.brand && (
          <FilterChip
            label={`Brand: ${Array.isArray(filters.brand) ? filters.brand.join(", ") : filters.brand}`}
            href={removeFilter("b")}
          />
        )}

        {/* Chip filtro categoria */}
        {filters.category && filters.category !== "all" && (
          <FilterChip
            label={`Categoria: ${filters.category}`}
            href={removeFilter("c")}
          />
        )}

        {/* Chip filtro tag */}
        {filters.tag && (
          <FilterChip label={`Tag: ${filters.tag}`} href={removeFilter("t")} />
        )}

        {/* Pulsante Clear All */}
        <Link
          href={clearAllHref()}
          className="text-sm text-primary dark:text-darkmode-primary hover:underline font-medium ml-auto"
        >
          Cancella tutti i filtri
        </Link>
      </div>
    </div>
  );
}

// Componente riutilizzabile per chip filtro
function FilterChip({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-darkmode-primary/10 text-primary dark:text-darkmode-primary text-sm font-medium hover:bg-primary/20 dark:hover:bg-darkmode-primary/20 transition-colors group"
    >
      <span>{label}</span>
      <HiX className="w-4 h-4 group-hover:scale-110 transition-transform" />
    </Link>
  );
}
