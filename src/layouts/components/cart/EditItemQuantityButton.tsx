import type { CartItem } from "@/lib/shopify/types";
import { updateItemQuantity } from "@/lib/utils/cartActions";
import EditItemQuantityButtonClient from "./EditItemQuantityButton.client";

type EditItemQuantityButtonProps = {
  item: CartItem;
  type: "plus" | "minus";
};

export function EditItemQuantityButton({
  item,
  type,
}: EditItemQuantityButtonProps) {
  return (
    <EditItemQuantityButtonClient
      action={updateItemQuantity}
      item={item}
      type={type}
    />
  );
}
