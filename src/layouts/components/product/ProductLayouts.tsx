"use client";

import { SortFilterItem, sorting } from "@/lib/constants";
import ProductFilters from "@/partials/ProductFilters";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { TbFilter, TbFilterX } from "react-icons/tb";
import DropdownMenu from "../filter/DropdownMenu";

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

const ProductLayouts = ({
  categories,
  vendors,
  tags,
  maxPriceData,
  vendorsWithCounts,
  categoriesWithCounts,
}: any) => {
  const searchParams = useSearchParams();
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".collapse-container-class") &&
        !target.closest(".filter-button-container") &&
        isExpanded
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isExpanded, setExpanded]);

  // Calcola filtri attivi per counter
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchParams.get("q")) count++;
    if (searchParams.get("minPrice") || searchParams.get("maxPrice")) count++;
    if (searchParams.get("b")) count++;
    const category = searchParams.get("c");
    if (category && category !== "all") count++;
    if (searchParams.get("t")) count++;
    return count;
  }, [searchParams]);

  return (
    <section className="py-4 md:py-6">
      <div className="container">
        {/* Barra Controlli - Filtri + Sort */}
        <div className="flex items-center justify-between gap-3 mb-6">
          {/* SINISTRA: Button Filtri */}
          <div className="relative filter-button-container">
            <button
              onClick={() => setExpanded(!isExpanded)}
              className="btn btn-outline-primary p-2.5 relative"
              title={isExpanded ? "Chiudi filtri" : "Mostra filtri"}
              aria-label="Filtri"
            >
              {isExpanded ? <TbFilterX size={20} /> : <TbFilter size={20} />}
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Dropdown Modale Filtri */}
            {isExpanded && (
              <div className="collapse-container-class absolute top-full left-0 mt-2 w-screen max-w-sm md:max-w-md lg:max-w-lg bg-white dark:bg-darkmode-body border border-border dark:border-darkmode-border rounded-2xl shadow-2xl z-50 max-h-[80vh] overflow-y-auto">
                <div className="p-4 md:p-6">
                  <Suspense>
                    <ProductFilters
                      categories={categories}
                      vendors={vendors}
                      tags={tags}
                      maxPriceData={maxPriceData}
                      vendorsWithCounts={vendorsWithCounts}
                      categoriesWithCounts={categoriesWithCounts}
                    />
                  </Suspense>
                </div>
              </div>
            )}
          </div>

          {/* DESTRA: Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-dark dark:text-darkmode-text-dark hidden sm:inline">
              Ordina:
            </span>
            <Suspense>
              <DropdownMenu list={sorting} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductLayouts;
