import Link from "next/link";
import { Cart } from "@/lib/shopify/types";
import OpenCart from "./OpenCart";

type CartTriggerProps = {
  cart?: Cart;
  className?: string;
};

const CartTrigger = ({ cart, className }: CartTriggerProps) => {
  const quantity = cart?.totalQuantity ?? 0;
  const label =
    quantity > 0
      ? `Apri il carrello (${quantity} ${quantity === 1 ? "articolo" : "articoli"})`
      : "Apri il carrello (vuoto)";

  return (
    <Link
      href="/cart"
      className={`relative inline-flex items-center justify-center ${className ?? ""}`}
      aria-label={label}
    >
      <OpenCart quantity={quantity} />
    </Link>
  );
};

export default CartTrigger;
