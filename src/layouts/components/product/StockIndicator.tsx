"use client";

import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { useTranslations } from "next-intl";

interface StockIndicatorProps {
  availableForSale: boolean;
  className?: string;
}

const StockIndicator = ({
  availableForSale,
  className = "",
}: StockIndicatorProps) => {
  const t = useTranslations("product");

  if (availableForSale) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 text-success  ${className}`}
      >
        <HiCheckCircle size={18} />
        <span className="text-sm md:text-base font-medium">
          {t("available")}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 text-error  ${className}`}
    >
      <HiXCircle size={18} />
      <span className="text-sm md:text-base font-medium">{t("soldOut")}</span>
    </div>
  );
};

export default StockIndicator;
