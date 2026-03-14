import { Link } from "@/i18n/navigation";
import { Cart } from "@/lib/shopify/types";
import { getTranslations } from "next-intl/server";
import OpenCart from "./OpenCart";

type CartTriggerProps = {
  cart?: Cart;
  className?: string;
};

const CartTrigger = async ({ cart, className }: CartTriggerProps) => {
  const t = await getTranslations("cart");
  const quantity = cart?.totalQuantity ?? 0;
  const label =
    quantity > 0
      ? t("openCartWithItems", { count: quantity })
      : t("openCartEmpty");

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
