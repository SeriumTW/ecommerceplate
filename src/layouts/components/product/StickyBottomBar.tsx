"use client";

import { AddToCart } from "@/components/cart/AddToCart";
import config from "@/config/config.json";
import { Product } from "@/lib/shopify/types";

interface StickyBottomBarProps {
  product: Product;
  defaultVariantId?: string;
}

const StickyBottomBar = ({
  product,
  defaultVariantId,
}: StickyBottomBarProps) => {
  const { currencySymbol } = config.shopify;

  const currentPrice = parseFloat(
    product?.priceRange?.minVariantPrice?.amount || "0",
  );
  const compareAtPrice = parseFloat(
    product?.compareAtPriceRange?.maxVariantPrice?.amount || "0",
  );
  const hasDiscount = compareAtPrice > currentPrice && compareAtPrice > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-darkmode-body border-t border-border dark:border-darkmode-border shadow-2xl z-50 lg:hidden">
      <div className="container">
        <div className="flex items-center justify-between gap-3 py-4">
          {/* Prezzo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-bold text-text-dark dark:text-darkmode-text-dark">
                {currencySymbol}
                {currentPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs md:text-sm text-text-light dark:text-darkmode-text-light line-through">
                  {currencySymbol}
                  {compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className="text-xs text-success dark:text-darkmode-success font-medium">
                Risparmi {currencySymbol}
                {(compareAtPrice - currentPrice).toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="flex-1 max-w-xs">
            <AddToCart
              variants={product?.variants}
              availableForSale={product?.availableForSale}
              stylesClass="btn btn-primary w-full !py-3 !px-5 !text-sm md:!text-base font-bold shadow-lg"
              handle={null}
              defaultVariantId={defaultVariantId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBottomBar;
