import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts, getProducts } from "@/lib/shopify";
import type { PageInfo, Product } from "@/lib/shopify/types";
import {
  buildProductQuery,
  extractFiltersFromSearchParams,
  type ProductFilters,
} from "@/lib/utils/productQueryBuilder";
import { titleify } from "@/lib/utils/textConverter";
import { NextRequest, NextResponse } from "next/server";

const buildCollectionFilters = (filters: ProductFilters) => {
  const collectionFilters: Array<Record<string, unknown>> = [];

  if (filters.minPrice || filters.maxPrice) {
    const price: { min?: number; max?: number } = {};

    if (filters.minPrice) {
      const min = Number(filters.minPrice);
      if (!Number.isNaN(min)) {
        price.min = min;
      }
    }

    if (filters.maxPrice) {
      const max = Number(filters.maxPrice);
      if (!Number.isNaN(max)) {
        price.max = max;
      }
    }

    if (Object.keys(price).length > 0) {
      collectionFilters.push({ price });
    }
  }

  if (filters.brand) {
    const brands = Array.isArray(filters.brand)
      ? filters.brand
      : [filters.brand];
    for (const brand of brands) {
      if (brand) {
        collectionFilters.push({ productVendor: titleify(brand) });
      }
    }
  }

  if (filters.tag) {
    const normalizedTag =
      filters.tag.charAt(0).toUpperCase() + filters.tag.slice(1);
    collectionFilters.push({ tag: normalizedTag });
  }

  return collectionFilters.length > 0 ? collectionFilters : undefined;
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const sort = searchParams.get("sort") ?? undefined;
    const cursor = searchParams.get("cursor") ?? undefined;

    const paramsRecord: Record<string, string | undefined> = {};
    searchParams.forEach((value, key) => {
      if (paramsRecord[key] === undefined) {
        paramsRecord[key] = value;
      }
    });

    const filters = extractFiltersFromSearchParams(paramsRecord);

    const { sortKey, reverse } =
      sorting.find((item) => item.slug === sort) ?? defaultSort;

    const queryString = buildProductQuery(filters);

    let response: { pageInfo: PageInfo | null; products: Product[] };

    if (filters.category && filters.category !== "all") {
      response = await getCollectionProducts({
        collection: filters.category,
        sortKey,
        reverse,
        filterCategoryProduct: buildCollectionFilters(filters),
      });
    } else {
      response = await getProducts({
        query: queryString || undefined,
        reverse,
        sortKey,
        cursor,
      });
    }

    return NextResponse.json({
      pageInfo: response.pageInfo,
      products: response.products,
    });
  } catch (cause) {
    console.error("Unable to fetch products", cause);
    const status =
      typeof (cause as { status?: number })?.status === "number"
        ? (cause as { status: number }).status
        : 500;
    return NextResponse.json({ error: "Unable to fetch products" }, { status });
  }
}
