"use client";

import { AddToCart } from "@/components/cart/AddToCart";
import QuantitySelector from "@/components/product/QuantitySelector";
import { Product } from "@/lib/shopify/types";
import { useState } from "react";

interface ProductActionsProps {
  product: Product;
  defaultVariantId?: string;
}

const ProductActions = ({ product, defaultVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      {/* Quantity Selector */}
      <div className="mb-6">
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
          max={99}
          disabled={!product.availableForSale}
        />
      </div>

      {/* Add to Cart */}
      <AddToCart
        variants={product.variants}
        availableForSale={product.availableForSale}
        stylesClass="btn btn-primary w-full !py-3 md:!py-3.5 !text-sm md:!text-base font-bold"
        handle={null}
        defaultVariantId={defaultVariantId}
      />
    </>
  );
};

export default ProductActions;
