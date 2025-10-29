import type { ProductVariant } from "@/lib/shopify/types";
import { addItem } from "@/lib/utils/cartActions";
import AddToCartButton from "./AddToCartButton";

type AddToCartProps = {
  variants: ProductVariant[];
  availableForSale: boolean;
  stylesClass?: string;
  handle: string | null;
  defaultVariantId: string | undefined;
  isInCart?: boolean;
};

export function AddToCart(props: AddToCartProps) {
  return <AddToCartButton action={addItem} {...props} />;
}

export default AddToCart;
