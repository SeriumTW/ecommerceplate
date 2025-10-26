"use client";

import { ProductVariant } from "@/lib/shopify/types";
import { addItem } from "@/lib/utils/cartActions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { BiLoaderAlt } from "react-icons/bi";
import { HiPlus, HiCheck } from "react-icons/hi";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  stylesClass,
  handle,
  showSuccess,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  stylesClass: string;
  handle: string | null;
  showSuccess: boolean;
}) {
  const { pending } = useFormStatus();
  const buttonClasses = stylesClass;
  const disabledClasses = "cursor-not-allowed flex";

  const DynamicTag = handle === null ? "button" : Link;

  if (!availableForSale) {
    return (
      <button
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
        href={`/products/${handle}`}
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
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
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
      className={`${buttonClasses} ${showSuccess ? "!bg-success !text-white" : ""} transition-colors duration-200`}
    >
      {pending ? (
        <>
          <BiLoaderAlt className="animate-spin" size={18} />
          <span>Aggiungendo...</span>
        </>
      ) : showSuccess ? (
        <>
          <HiCheck size={18} />
          <span>Nel carrello</span>
        </>
      ) : buttonClasses.includes("w-9 h-9") ||
        buttonClasses.includes("rounded-full") ? (
        <HiPlus size={18} />
      ) : (
        <>
          <HiPlus size={18} />
          <span>Aggiungi</span>
        </>
      )}
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale,
  stylesClass,
  handle,
  defaultVariantId,
  isInCart = false,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  stylesClass: string;
  handle: string | null;
  defaultVariantId: string | undefined;
  isInCart?: boolean;
}) {
  const [message, formAction] = useActionState(addItem, null);
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(isInCart);

  // Find the variant based on selected options
  const selectedOptions = Array.from(searchParams.entries());
  const variant = variants.find((variant: ProductVariant) =>
    selectedOptions.every(([key, value]) =>
      variant.selectedOptions.some(
        (option) => option.name.toLowerCase() === key && option.value === value,
      ),
    ),
  );

  // Use the default variant ID if no variant is found
  const selectedVariantId = variant?.id || defaultVariantId;

  const actionWithVariant = formAction.bind(null, selectedVariantId);

  // Update showSuccess when isInCart prop changes
  useEffect(() => {
    setShowSuccess(isInCart);
  }, [isInCart]);

  // Show success feedback when message changes (item added)
  useEffect(() => {
    if (message) {
      setShowSuccess(true);
    }
  }, [message]);

  return (
    <form action={actionWithVariant}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        stylesClass={stylesClass}
        handle={handle}
        showSuccess={showSuccess}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
