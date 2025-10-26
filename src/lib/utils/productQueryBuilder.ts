/**
 * Utility per costruire query Shopify prodotti
 * Elimina duplicazione logica tra page.tsx, ProductCardView.tsx, ProductListView.tsx
 */

export interface ProductFilters {
  searchValue?: string;
  minPrice?: string;
  maxPrice?: string;
  brand?: string | string[];
  category?: string;
  tag?: string;
}

/**
 * Costruisce query string per Shopify API basata su filtri attivi
 */
export function buildProductQuery(filters: ProductFilters): string {
  let queryString = "";

  // Filtro prezzo
  if (filters.minPrice || filters.maxPrice) {
    if (filters.maxPrice) {
      queryString += `variants.price:<=${filters.maxPrice} `;
    }
    if (filters.minPrice) {
      queryString += `variants.price:>=${filters.minPrice} `;
    }
  }

  // Ricerca testuale
  if (filters.searchValue) {
    queryString += `${filters.searchValue} `;
  }

  // Filtro brand/vendor
  if (filters.brand) {
    if (Array.isArray(filters.brand)) {
      queryString += `${filters.brand.map((b) => `(vendor:${b})`).join(" OR ")} `;
    } else {
      queryString += `vendor:"${filters.brand}" `;
    }
  }

  // Filtro tag
  if (filters.tag) {
    queryString += `${filters.tag} `;
  }

  return queryString.trim();
}

/**
 * Verifica se ci sono filtri attivi (escludendo sorting e layout)
 */
export function hasActiveFilters(filters: ProductFilters): boolean {
  return !!(
    filters.searchValue ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.brand ||
    filters.category ||
    filters.tag
  );
}

/**
 * Conta numero filtri attivi
 */
export function countActiveFilters(filters: ProductFilters): number {
  let count = 0;
  if (filters.searchValue) count++;
  if (filters.minPrice || filters.maxPrice) count++;
  if (filters.brand) count++;
  if (filters.category && filters.category !== "all") count++;
  if (filters.tag) count++;
  return count;
}

/**
 * Crea oggetto filtri pulito da searchParams
 */
export function extractFiltersFromSearchParams(searchParams: {
  [key: string]: string | undefined;
}): ProductFilters {
  return {
    searchValue: searchParams.q,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
    brand: searchParams.b,
    category: searchParams.c,
    tag: searchParams.t,
  };
}
