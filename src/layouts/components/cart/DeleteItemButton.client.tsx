"use client";

import { useActionState, useEffect, useMemo } from "react";
import { useFormStatus } from "react-dom";
import { FaXmark } from "react-icons/fa6";
import type { CartItem } from "@/lib/shopify/types";
import type { CartActionResult } from "@/lib/utils/cartActions";
import LoadingDots from "../loadings/LoadingDots";

type DeleteButtonProps = {
  action: (
    prevState: CartActionResult | null,
    lineId: string,
  ) => Promise<CartActionResult>;
  item: CartItem;
};

const CART_EVENT = "cart:changed";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(event: React.FormEvent<HTMLButtonElement>) => {
        if (pending) event.preventDefault();
      }}
      aria-label="Rimuovi articolo dal carrello"
      aria-disabled={pending}
      disabled={pending}
      className={`ease flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-error/50 hover:bg-error ${
        pending ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {pending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <FaXmark className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
      )}
    </button>
  );
}

const DeleteItemButtonClient = ({ action, item }: DeleteButtonProps) => {
  const [state, formAction] = useActionState<CartActionResult | null>(
    action,
    null,
  );

  const boundAction = useMemo(
    () => formAction.bind(null, item.id),
    [formAction, item.id],
  );

  useEffect(() => {
    if (state?.status === "success" && typeof window !== "undefined") {
      window.dispatchEvent(new Event(CART_EVENT));
    }
  }, [state]);

  return (
    <form action={boundAction}>
      <SubmitButton />
      {state?.status === "error" && (
        <div role="alert" aria-live="assertive" className="sr-only">
          {state.message || "Errore durante la rimozione"}
        </div>
      )}
      {state?.status === "success" && (
        <p aria-live="polite" className="sr-only" role="status">
          Articolo rimosso dal carrello
        </p>
      )}
    </form>
  );
};

export default DeleteItemButtonClient;
