import Social from "@/layouts/components/Social";
import Breadcrumbs from "@/layouts/components/Breadcrumbs";
import LoadingProductGallery from "@/layouts/components/loadings/skeleton/SkeletonProductGallery";
import ProductActions from "@/components/product/ProductActions";
import ProductGallery from "@/components/product/ProductGallery";
import ShowTags from "@/components/product/ShowTags";
import StockIndicator from "@/components/product/StockIndicator";
import StickyBottomBar from "@/components/product/StickyBottomBar";
import Tabs from "@/components/product/Tabs";
import TrustBadges from "@/components/product/TrustBadges";
import { VariantSelector } from "@/components/product/VariantSelector";
import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const product = await getProduct(params.slug);
  if (!product) return notFound();
  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
  };
};

const ProductSingle = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  return (
    <Suspense fallback={<LoadingProductGallery />}>
      <ShowProductSingle params={params} />
    </Suspense>
  );
};

export default ProductSingle;

const ShowProductSingle = async ({ params }: { params: { slug: string } }) => {
  const paymentsAndDelivery = getListPage("sections/payments-and-delivery.md");
  const { payment_methods, estimated_delivery } =
    paymentsAndDelivery.frontmatter;

  const { currencySymbol } = config.shopify;
  const product = await getProduct(params.slug);

  if (!product) return notFound();
  const {
    id,
    title,
    description,
    descriptionHtml,
    priceRange,
    compareAtPriceRange,
    images,
    options,
    variants,
    tags,
  } = product;

  const relatedProducts = await getProductRecommendations(id);

  const defaultVariantId = variants.length > 0 ? variants[0].id : undefined;

  // Breadcrumbs items
  const breadcrumbItems = [
    { label: "Prodotti", href: "/products" },
    { label: title, href: `/products/${params.slug}`, current: true },
  ];

  return (
    <>
      <section className="md:section-sm">
        <div className="container">
          {/* Breadcrumbs */}
          <div className="row">
            <div className="col-12">
              <Breadcrumbs items={breadcrumbItems} className="mb-6 md:mb-8" />
            </div>
          </div>

          <div className="row justify-center">
            {/* right side contents  */}
            <div className="col-10 md:col-8 lg:col-5">
              <Suspense>
                <ProductGallery images={images} />
              </Suspense>
            </div>

            {/* left side contents  */}
            <div className="col-10 md:col-8 lg:col-6 md:ml-7 py-6 lg:py-0">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-text-dark dark:text-darkmode-text-dark">
                {title}
              </h1>

              <div className="flex gap-2 items-center mb-4">
                <h4 className="text-xl md:text-2xl font-bold text-text-dark dark:text-darkmode-text-dark">
                  {currencySymbol} {priceRange?.minVariantPrice.amount}{" "}
                  {priceRange?.minVariantPrice?.currencyCode}
                </h4>
                {parseFloat(compareAtPriceRange?.maxVariantPrice.amount) > 0 ? (
                  <s className="text-sm md:text-base text-text-light dark:text-darkmode-text-light">
                    {currencySymbol}{" "}
                    {compareAtPriceRange?.maxVariantPrice?.amount}{" "}
                    {compareAtPriceRange?.maxVariantPrice?.currencyCode}
                  </s>
                ) : (
                  ""
                )}
              </div>

              {/* Stock Indicator */}
              <StockIndicator
                availableForSale={product.availableForSale}
                className="mb-6"
              />

              <div className="my-8 md:my-10 space-y-6 md:space-y-8">
                <div>
                  {options && (
                    <VariantSelector
                      options={options}
                      variants={variants}
                      images={images}
                    />
                  )}
                </div>
              </div>

              {/* Product Actions: Quantity + Add to Cart */}
              <Suspense>
                <ProductActions
                  product={product}
                  defaultVariantId={defaultVariantId}
                />
              </Suspense>

              {/* Trust Badges */}
              <div className="my-8 md:my-10">
                <TrustBadges />
              </div>

              <div className="mb-8 md:mb-10 bg-light/50 dark:bg-darkmode-light/30 p-4 md:p-5 rounded-2xl overflow-hidden">
                <h5 className="text-sm md:text-base font-semibold text-text-dark dark:text-darkmode-text-dark mb-3">
                  Condividi:
                </h5>
                <div className="overflow-x-auto">
                  <Social socialName={title} className="social-icons" />
                </div>
              </div>

              {tags.length > 0 && (
                <div className="bg-light/50 dark:bg-darkmode-light/30 p-4 md:p-5 rounded-2xl overflow-hidden">
                  <h5 className="text-sm md:text-base font-semibold text-text-dark dark:text-darkmode-text-dark mb-3">
                    Tag:
                  </h5>
                  <div className="flex flex-wrap gap-2 overflow-visible">
                    <Suspense>
                      <ShowTags tags={tags} />
                    </Suspense>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description of a product  */}
      {description && (
        <section className="pt-2 pb-16 md:pb-20">
          <div className="container">
            <div className="row">
              <div className="col-10 lg:col-11 mx-auto">
                <Tabs descriptionHtml={descriptionHtml} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recommended Products section  */}
      {relatedProducts?.length > 0 && (
        <section className="pt-8 md:pt-12 pb-16 md:pb-20">
          <div className="container">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="mb-2">Prodotti Correlati</h2>
            </div>
            <div className="row gy-5 justify-center items-stretch">
              {relatedProducts.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="col-6 sm:col-4 md:col-4 lg:col-3 flex items-stretch"
                >
                  <ProductCard
                    product={product}
                    isInCart={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Bottom Bar - Mobile Only */}
      <StickyBottomBar product={product} defaultVariantId={defaultVariantId} />
    </>
  );
};
