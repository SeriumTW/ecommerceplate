"use client";

import SkeletonCards from "@/components/loadings/skeleton/SkeletonCards";
import ProductCard from "@/components/ProductCard";
import useLoadMore from "@/hooks/useLoadMore";
import { defaultSort, sorting } from "@/lib/constants";
import { getCart, getCollectionProducts, getProducts } from "@/lib/shopify";
import { Cart, PageInfo, Product } from "@/lib/shopify/types";
import {
  buildProductQuery,
  extractFiltersFromSearchParams,
} from "@/lib/utils/productQueryBuilder";
import { titleify } from "@/lib/utils/textConverter";
import ImageFallback from "@/helpers/ImageFallback";
import { useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import Cookies from "js-cookie";

const ProductCardView = ({ searchParams }: { searchParams: any }) => {
  const [isLoading, setIsLoading] = useState(true);
  const targetElementRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<{
    products: Product[];
    pageInfo: PageInfo;
  }>({
    products: [],
    pageInfo: { endCursor: "", hasNextPage: false, hasPreviousPage: false },
  });
  const [cart, setCart] = useState<Cart | null>(null);

  const {
    sort,
    q: searchValue,
    minPrice,
    maxPrice,
    b: brand,
    c: category,
    t: tag,
    cursor,
  } = searchParams as {
    [key: string]: string;
  };

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  // Fetch cart function (reusable)
  const fetchCart = async () => {
    const cartId = Cookies.get("cartId");
    if (cartId) {
      const cartData = await getCart(cartId);
      setCart(cartData || null);
    }
  };

  // Auto-refresh cart every 2 seconds to sync state
  useEffect(() => {
    fetchCart(); // Initial fetch

    const interval = setInterval(() => {
      fetchCart();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let productsData;

        if (
          searchValue ||
          brand ||
          minPrice ||
          maxPrice ||
          category ||
          tag ||
          cursor
        ) {
          let queryString = "";
          let filterCategoryProduct = [];

          if (minPrice && maxPrice) {
            filterCategoryProduct.push({
              price: {
                min:
                  minPrice !== undefined && minPrice !== ""
                    ? parseFloat(minPrice)
                    : 0,
                max:
                  maxPrice !== undefined && maxPrice !== ""
                    ? parseFloat(maxPrice)
                    : Number.POSITIVE_INFINITY,
              },
            });
          }

          if (minPrice || maxPrice) {
            queryString += `variants.price:<=${maxPrice} variants.price:>=${minPrice}`;
          }

          if (searchValue) {
            queryString += ` ${searchValue}`;
          }

          if (brand) {
            Array.isArray(brand)
              ? (queryString += `${brand
                  .map((b) => `(vendor:${b})`)
                  .join(" OR ")}`)
              : (queryString += `vendor:"${brand}"`);

            if (Array.isArray(brand) && brand.length > 0) {
              brand.forEach((b) => {
                filterCategoryProduct.push({
                  productVendor: titleify(b),
                });
              });
            } else {
              filterCategoryProduct.push({
                productVendor: titleify(brand),
              });
            }
          }

          if (tag) {
            queryString += ` ${tag}`;

            filterCategoryProduct.push({
              tag: tag.charAt(0).toUpperCase() + tag.slice(1),
            });
          }

          const query = {
            sortKey,
            reverse,
            query: queryString,
          };

          productsData =
            category && category !== "all"
              ? await getCollectionProducts({
                  collection: category,
                  sortKey,
                  reverse,
                  filterCategoryProduct:
                    filterCategoryProduct.length > 0
                      ? filterCategoryProduct
                      : undefined,
                })
              : await getProducts({ ...query, cursor });
        } else {
          // Fetch all products
          productsData = await getProducts({ sortKey, reverse, cursor });
        }

        setData({
          products: productsData.products,
          pageInfo: productsData.pageInfo!,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    cursor,
    sortKey,
    searchValue,
    brand,
    minPrice,
    maxPrice,
    category,
    tag,
    reverse,
  ]);

  const { products, pageInfo } = data;
  const endCursor = pageInfo?.endCursor || "";
  const hasNextPage = pageInfo?.hasNextPage || false;

  useLoadMore(targetElementRef as React.RefObject<HTMLElement>, () => {
    if (hasNextPage && !isLoading) {
      fetchDataWithNewCursor(endCursor);
    }
  });

  const fetchDataWithNewCursor = async (newCursor: string) => {
    // setIsLoading(true);

    try {
      const res = await getProducts({
        sortKey,
        reverse,
        query: searchValue,
        cursor: newCursor,
      });

      setData({
        products: [...products, ...res.products],
        pageInfo: res.pageInfo,
      });
    } catch (error) {
      console.error("Error fetching more products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SkeletonCards />;
  }

  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <div ref={targetElementRef} className="row gy-5">
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
          <ProductCard
            key={product.id || index}
            product={product}
            isInCart={isInCart}
          />
        );
      })}

      {(hasNextPage || isLoading) && (
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
