"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Collection } from "@/lib/shopify/types";
import { useTranslations } from "next-intl";

interface CategoryHeaderProps {
  category?: Collection;
  searchValue?: string;
  productCount: number;
}

export default function CategoryHeader({
  category,
  searchValue,
  productCount,
}: CategoryHeaderProps) {
  const t = useTranslations("products");

  const title = searchValue
    ? t("resultsFor", { query: searchValue })
    : category?.title || t("allProducts");

  const description = !searchValue && category?.description;

  return (
    <section>
      <div className="text-center">
        <div className="bg-gradient-to-b from-body to-light px-8 py-14 md:py-20  ">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {title}
          </h1>

          {description && (
            <p className="text-base md:text-lg text-text  max-w-2xl mx-auto mb-6 leading-relaxed">
              {description}
            </p>
          )}

          <p className="text-sm md:text-base text-text  mb-6">
            {productCount === 0 ? (
              <span className="text-error  font-medium">
                {t("noProductsFound")}
              </span>
            ) : (
              <>
                {t("productCount", { count: productCount })}{" "}
                {searchValue ? t("found") : ""}
              </>
            )}
          </p>

          <Breadcrumbs className="mt-6" />
        </div>
      </div>
    </section>
  );
}
