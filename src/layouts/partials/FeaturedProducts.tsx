"use client";

import { AddToCart } from "@/components/cart/AddToCart";
import Price from "@/components/Price";
import ImageFallback from "@/layouts/helpers/ImageFallback";
import { Product } from "@/lib/shopify/types";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const FeaturedProducts = ({ products }: { products: Product[] }) => {
  const t = useTranslations("products");

  return (
    <>
      <div className="row">
        {products.map((product: Product) => {
          const {
            id,
            title,
            handle,
            featuredImage,
            priceRange,
            variants,
            compareAtPriceRange,
          } = product;

          const defaultVariantId =
            variants.length > 0 ? variants[0].id : undefined;
          return (
            <div
              key={id}
              className="text-center col-6 md:col-4 lg:col-3 mb-10 md:mb-12 group relative"
            >
              <div className="relative overflow-hidden">
                <ImageFallback
                  src={featuredImage?.url || "/images/product_image404.jpg"}
                  width={312}
                  height={269}
                  alt={featuredImage?.altText || title || "Immagine prodotto"}
                  loading="lazy"
                  className="w-[312px] h-[150px] md:h-[269px] object-cover border border-border rounded-2xl"
                />

                <AddToCart
                  variants={product.variants}
                  availableForSale={product.availableForSale}
                  handle={handle}
                  defaultVariantId={defaultVariantId}
                  stylesClass={
                    "btn btn-primary max-md:btn-sm z-10 absolute bottom-12 md:bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full md:group-hover:-translate-y-6 duration-300 ease-in-out whitespace-nowrap drop-shadow-md"
                  }
                />
              </div>
              <div className="pt-4 md:pt-6 text-center z-20">
                <h2 className="font-semibold text-sm md:text-base">
                  <Link
                    className="after:absolute after:inset-0 text-text-dark  hover:text-primary  transition-colors"
                    href={`/products/${handle}`}
                  >
                    {title}
                  </Link>
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-x-2 mt-3 md:mt-4">
                  <Price
                    as="span"
                    amount={priceRange.minVariantPrice.amount}
                    currencyCode={priceRange.minVariantPrice.currencyCode}
                    className="text-sm md:text-base font-bold text-text-dark "
                  />

                  {parseFloat(compareAtPriceRange?.maxVariantPrice.amount) >
                  0 ? (
                    <Price
                      as="span"
                      amount={compareAtPriceRange.maxVariantPrice.amount}
                      currencyCode={
                        compareAtPriceRange.maxVariantPrice.currencyCode
                      }
                      className="text-text-light line-through  text-xs md:text-sm font-medium"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Link
          className="btn btn-sm md:btn-lg btn-primary font-medium"
          href={"/products"}
        >
          {t("seeAllProducts")}
        </Link>
      </div>
    </>
  );
};

export default FeaturedProducts;
