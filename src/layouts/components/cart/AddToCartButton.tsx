"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { BiLoaderAlt } from "react-icons/bi";
import { HiCheck, HiPlus } from "react-icons/hi";
import type { ProductVariant } from "@/lib/shopify/types";
import type { CartActionResult } from "@/lib/utils/cartActions";

type SubmitButtonProps = {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  stylesClass: string;
  handle: string | null;
  showSuccess: boolean;
};

function SubmitButton({
  availableForSale,
  selectedVariantId,
  stylesClass,
  handle,
  showSuccess,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const buttonClasses = stylesClass ?? "";
  const disabledClasses = "cursor-not-allowed flex";

  const DynamicTag = handle === null ? "button" : Link;

  if (!availableForSale) {
    return (
      <button
        type="button"
        disabled
        aria-disabled
        className={`${buttonClasses} ${disabledClasses}`}
      >
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <DynamicTag
        href={`/products/${handle ?? ""}`}
        aria-label="Please select an option"
        aria-disabled
        className={`${buttonClasses} ${
          DynamicTag === "button" && disabledClasses
        }`}
      >
        Select Variant
      </DynamicTag>
    );
  }

  return (
    <button
      type="submit"
      onClick={(event: React.FormEvent<HTMLButtonElement>) => {
        if (pending) event.preventDefault();
      }}
      aria-label={
        showSuccess
          ? "Nel carrello - Clicca per aggiungere +1"
          : "Aggiungi al carrello"
      }
      title={
        showSuccess
          ? "Nel carrello - Clicca per aggiungere +1"
          : "Aggiungi al carrello"
      }
      aria-disabled={pending ? "true" : "false"}
      disabled={pending}
      className={`${buttonClasses} ${
        showSuccess ? "!bg-success !text-white" : ""
      } flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-darkmode-primary/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none min-h-[44px]`}
    >
      {pending ? (
        <>
          <BiLoaderAlt className="animate-spin flex-shrink-0" size={20} />
          <span className="font-semibold">Aggiungendo...</span>
        </>
      ) : showSuccess ? (
        <>
          <HiCheck className="flex-shrink-0" size={20} />
          <span className="font-semibold">Nel carrello</span>
        </>
      ) : buttonClasses.includes("w-9 h-9") ||
        buttonClasses.includes("rounded-full") ? (
        <HiPlus size={20} />
      ) : (
        <>
          <HiPlus className="flex-shrink-0" size={20} />
          <span className="font-semibold">Aggiungi</span>
        </>
      )}
    </button>
  );
}

type AddToCartButtonProps = {
  variants: ProductVariant[];
  availableForSale: boolean;
  stylesClass?: string;
  handle: string | null;
  defaultVariantId: string | undefined;
  isInCart?: boolean;
  action: (
    prevState: CartActionResult | null,
    formData: FormData,
  ) => Promise<CartActionResult>;
};

const CART_EVENT = "cart:changed";

const AddToCartButton = ({
  variants,
  availableForSale,
  stylesClass = "",
  handle,
  defaultVariantId,
  isInCart = false,
  action,
}: AddToCartButtonProps) => {
  const searchParams = useSearchParams();
  const [actionState, formAction] = useActionState(action, null);
  const [showSuccess, setShowSuccess] = useState(isInCart);

  const selectedOptions = useMemo(
    () => Array.from(searchParams.entries()),
    [searchParams],
  );

  const variant = useMemo(
    () =>
      variants.find((productVariant: ProductVariant) =>
        selectedOptions.every(([key, value]) =>
          productVariant.selectedOptions.some(
            (option) =>
              option.name.toLowerCase() === key && option.value === value,
          ),
        ),
      ),
    [selectedOptions, variants],
  );

  const selectedVariantId = variant?.id ?? defaultVariantId;

  useEffect(() => {
    setShowSuccess(isInCart);
  }, [isInCart]);

  useEffect(() => {
    if (actionState?.status === "success") {
      setShowSuccess(true);

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(CART_EVENT));
      }
    }
  }, [actionState]);

  return (
    <form action={formAction}>
      <input type="hidden" name="variantId" value={selectedVariantId} />
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        stylesClass={stylesClass}
        handle={handle}
        showSuccess={showSuccess}
      />
      {actionState?.status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-2 text-sm text-error dark:text-darkmode-error"
        >
          {actionState.message || "Errore durante l'aggiunta al carrello"}
        </div>
      )}
      {actionState?.status === "success" && (
        <p aria-live="polite" className="sr-only" role="status">
          Prodotto aggiunto al carrello con successo
        </p>
      )}
    </form>
  );
};

export default AddToCartButton;
