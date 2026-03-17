"use client";

import { Link } from "@/i18n/navigation";
import { HiSearch, HiRefresh } from "react-icons/hi";
import { useTranslations } from "next-intl";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showClearFilters?: boolean;
  clearFiltersHref?: string;
}

export default function EmptyState({
  title,
  description,
  showClearFilters = true,
  clearFiltersHref = "/products",
}: EmptyStateProps) {
  const tCommon = useTranslations("common");
  const t = useTranslations("products");

  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
      {/* Icona */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-light/50  flex items-center justify-center mb-6">
        <HiSearch className="w-10 h-10 md:w-12 md:h-12 text-text/40 " />
      </div>

      {/* Titolo */}
      <h3 className="text-2xl md:text-3xl font-bold text-text-dark  mb-3 text-center">
        {title ?? t("noProductsFound")}
      </h3>

      {/* Descrizione */}
      <p className="text-base md:text-lg text-text  text-center max-w-md mb-8">
        {description ?? t("noProductsDescription")}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        {showClearFilters && (
          <Link
            href={clearFiltersHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white hover:bg-primary-hover transition-colors font-medium"
          >
            <HiRefresh className="w-5 h-5" />
            <span>{tCommon("clearFilters")}</span>
          </Link>
        )}

        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border-2 border-primary text-primary hover:bg-primary/10    transition-colors font-medium"
        >
          <span>{t("seeAllProducts")}</span>
        </Link>
      </div>
    </div>
  );
}
