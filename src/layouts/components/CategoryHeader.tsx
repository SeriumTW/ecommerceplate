"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Collection } from "@/lib/shopify/types";

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
  const title = searchValue
    ? `Risultati per "${searchValue}"`
    : category?.title || "Tutti i Prodotti";

  const description = !searchValue && category?.description;

  return (
    <section>
      <div className="text-center">
        <div className="bg-gradient-to-b from-body to-light px-8 py-14 md:py-20 dark:from-darkmode-body dark:to-darkmode-light">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {title}
          </h1>

          {description && (
            <p className="text-base md:text-lg text-text dark:text-darkmode-text max-w-2xl mx-auto mb-6 leading-relaxed">
              {description}
            </p>
          )}

          <p className="text-sm md:text-base text-text dark:text-darkmode-text mb-6">
            {productCount === 0 ? (
              <span className="text-error dark:text-darkmode-error font-medium">
                Nessun prodotto trovato
              </span>
            ) : (
              <>
                <span className="font-semibold text-primary dark:text-darkmode-primary">
                  {productCount}
                </span>{" "}
                {productCount === 1 ? "prodotto" : "prodotti"}{" "}
                {searchValue && "trovati"}
              </>
            )}
          </p>

          <Breadcrumbs className="mt-6" />
        </div>
      </div>
    </section>
  );
}
