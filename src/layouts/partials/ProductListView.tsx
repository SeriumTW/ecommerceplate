"use client";

import ProductListItem from "@/components/ProductListItem";
import useLoadMore from "@/hooks/useLoadMore";
import type { PageInfo, Product } from "@/lib/shopify/types";
import ImageFallback from "@/layouts/helpers/ImageFallback";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

type SearchParamsRecord = Record<string, string | undefined>;

type ProductListViewProps = {
  searchParams: SearchParamsRecord;
  initialProducts: Product[];
  initialPageInfo: PageInfo | null;
};

const EMPTY_PAGE_INFO: PageInfo = {
  endCursor: "",
  hasNextPage: false,
  hasPreviousPage: false,
};

const ProductListView = ({
  searchParams,
  initialProducts,
  initialPageInfo,
}: ProductListViewProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [state, setState] = useState({
    products: initialProducts,
    pageInfo: initialPageInfo ?? EMPTY_PAGE_INFO,
  });

  useEffect(() => {
    setState({
      products: initialProducts,
      pageInfo: initialPageInfo ?? EMPTY_PAGE_INFO,
    });
  }, [initialPageInfo, initialProducts]);

  const baseParams = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "cursor") {
        params.set(key, value);
      }
    });
    return params;
  }, [searchParams]);

  const hasNextPage = state.pageInfo?.hasNextPage ?? false;
  const endCursor = state.pageInfo?.endCursor;

  const fetchNextPage = useCallback(async () => {
    if (!hasNextPage || isFetchingMore || !endCursor) {
      return;
    }

    setIsFetchingMore(true);

    try {
      const params = new URLSearchParams(baseParams);
      params.set("cursor", endCursor);

      const response = await fetch(`/api/products?${params.toString()}`, {
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error(`Unexpected status ${response.status}`);
      }

      const data = (await response.json()) as {
        products: Product[];
        pageInfo: PageInfo | null;
      };

      setState((prev) => ({
        products: [...prev.products, ...data.products],
        pageInfo: data.pageInfo ?? prev.pageInfo,
      }));
    } catch (cause) {
      console.error("Error fetching more products:", cause);
    } finally {
      setIsFetchingMore(false);
    }
  }, [baseParams, endCursor, hasNextPage, isFetchingMore]);

  useLoadMore(sentinelRef, fetchNextPage);

  const { products, pageInfo } = state;
  const searchValue = searchParams.q;
  const hasNext = pageInfo?.hasNextPage ?? false;
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <section>
      <div className="row">
        {searchValue ? (
          <p className="mb-4">
            {products.length === 0
              ? "There are no products that match "
              : `Showing ${products.length} ${resultsText} for `}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </p>
        ) : null}

        {products?.length === 0 && (
          <div className="mx-auto pt-5 text-center">
            <ImageFallback
              className="mx-auto mb-6"
              src="/images/no-search-found.png"
              alt="no-search-found"
              width={211}
              height={184}
            />
            <h1 className="h2 mb-4">No Product Found!</h1>
            <p>
              We couldn&apos;t find what you filtered for. Try filtering again.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {products?.map((product: Product, index) => (
            <ProductListItem key={product.id || index} product={product} />
          ))}
        </div>

        <div ref={sentinelRef} className="w-full h-1" aria-hidden />

        {(hasNext || isFetchingMore) && (
          <div className="flex justify-center mt-12">
            <BiLoaderAlt
              className="animate-spin text-primary dark:text-darkmode-primary"
              size={40}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductListView;
