import type { CartItem } from "@/lib/shopify/types";
import { removeItem } from "@/lib/utils/cartActions";
import DeleteItemButtonClient from "./DeleteItemButton.client";

type DeleteItemButtonProps = {
  item: CartItem;
};

export function DeleteItemButton({ item }: DeleteItemButtonProps) {
  return <DeleteItemButtonClient action={removeItem} item={item} />;
}
