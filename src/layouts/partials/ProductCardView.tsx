"use client";

import ProductCard from "@/components/ProductCard";
import useLoadMore from "@/hooks/useLoadMore";
import type { Cart, PageInfo, Product } from "@/lib/shopify/types";
import ImageFallback from "@/layouts/helpers/ImageFallback";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

type SearchParamsRecord = Record<string, string | undefined>;

type ProductCardViewProps = {
  searchParams: SearchParamsRecord;
  initialProducts: Product[];
  initialPageInfo: PageInfo | null;
};

const EMPTY_PAGE_INFO: PageInfo = {
  endCursor: "",
  hasNextPage: false,
  hasPreviousPage: false,
};

const ProductCardView = ({
  searchParams,
  initialProducts,
  initialPageInfo,
}: ProductCardViewProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [state, setState] = useState({
    products: initialProducts,
    pageInfo: initialPageInfo ?? EMPTY_PAGE_INFO,
  });
  const [isFetchingMore, setIsFetchingMore] = useState(false);

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

  const searchValue = searchParams.q;

  const fetchCart = useCallback(async () => {
    try {
      const response = await fetch("/api/cart", {
        credentials: "same-origin",
      });

      if (!response.ok) {
        setCart(null);
        return;
      }

      const data = (await response.json()) as { cart: Cart | null };
      setCart(data.cart ?? null);
    } catch (cause) {
      console.error("Error fetching cart", cause);
      setCart(null);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    void fetchCart();

    const handler = () => {
      void fetchCart();
    };

    window.addEventListener("cart:changed", handler);
    return () => window.removeEventListener("cart:changed", handler);
  }, [fetchCart]);

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

  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <div className="row gy-5">
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
            className="mx-auto mb-6 w-[211px] h-[184px]"
            src="/images/no-search-found.png"
            alt="no-search-found"
            width={211}
            height={184}
            priority={true}
          />
          <h1 className="h2 mb-4">No Product Found!</h1>
          <p>
            We couldn&apos;t find what you filtered for. Try filtering again.
          </p>
        </div>
      )}

      {products.map((product, index) => {
        // Check if product variant is in cart
        const defaultVariantId =
          product?.variants.length > 0 ? product?.variants[0].id : undefined;
        const isInCart =
          cart?.lines.some(
            (line) => line.merchandise.id === defaultVariantId,
          ) || false;

        return (
          <div key={product.id || index} className="col-12 sm:col-6 md:col-4">
            <ProductCard
              product={product}
              isInCart={isInCart}
            />
          </div>
        );
      })}

      <div ref={sentinelRef} className="w-full h-1" aria-hidden />

      {(hasNextPage || isFetchingMore) && (
        <div className="flex justify-center mt-12">
          <BiLoaderAlt
            className="animate-spin text-primary dark:text-darkmode-primary"
            size={40}
          />
        </div>
      )}
    </div>
  );
};

export default ProductCardView;
