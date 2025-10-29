"use client";

import { useActionState, useEffect, useMemo } from "react";
import { useFormStatus } from "react-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import type { CartItem } from "@/lib/shopify/types";
import type { CartActionResult } from "@/lib/utils/cartActions";
import LoadingDots from "../loadings/LoadingDots";

type EditButtonProps = {
  action: (
    prevState: CartActionResult | null,
    formData: FormData,
  ) => Promise<CartActionResult>;
  item: CartItem;
  type: "plus" | "minus";
};

const CART_EVENT = "cart:changed";

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(event: React.FormEvent<HTMLButtonElement>) => {
        if (pending) event.preventDefault();
      }}
      aria-label={
        type === "plus"
          ? "Aumenta quantità articolo"
          : "Riduci quantità articolo"
      }
      aria-disabled={pending}
      disabled={pending}
      className={`ease flex h-full min-w-[44px] min-h-[44px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-darkmode-primary/50 ${
        pending ? "cursor-not-allowed opacity-50" : ""
      } ${type === "minus" ? "ml-auto" : ""}`}
    >
      {pending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === "plus" ? (
        <FaPlus className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <FaMinus className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

const EditItemQuantityButtonClient = ({
  action,
  item,
  type,
}: EditButtonProps) => {
  const [state, formAction] = useActionState(action, null);

  const quantity = type === "plus" ? item.quantity + 1 : item.quantity - 1;

  useEffect(() => {
    if (state?.status === "success" && typeof window !== "undefined") {
      window.dispatchEvent(new Event(CART_EVENT));
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="lineId" value={item.id} />
      <input type="hidden" name="variantId" value={item.merchandise.id} />
      <input type="hidden" name="quantity" value={quantity} />
      <SubmitButton type={type} />
      {state?.status === "error" && (
        <div role="alert" aria-live="assertive" className="sr-only">
          {state.message || "Errore durante l'aggiornamento quantità"}
        </div>
      )}
      {state?.status === "success" && (
        <p aria-live="polite" className="sr-only" role="status">
          Quantità aggiornata con successo
        </p>
      )}
    </form>
  );
};

export default EditItemQuantityButtonClient;
