import Social from "@/components/Social";
import { AddToCart } from "@/components/cart/AddToCart";
import LoadingProductGallery from "@/components/loadings/skeleton/SkeletonProductGallery";
import ProductGallery from "@/components/product/ProductGallery";
import ShowTags from "@/components/product/ShowTags";
import Tabs from "@/components/product/Tabs";
import { VariantSelector } from "@/components/product/VariantSelector";
import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import LatestProducts from "@/partials/FeaturedProducts";
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

  return (
    <>
      <section className="md:section-sm">
        <div className="container">
          <div className="row justify-center">
            {/* right side contents  */}
            <div className="col-10 md:col-8 lg:col-6">
              <Suspense>
                <ProductGallery images={images} />
              </Suspense>
            </div>

            {/* left side contents  */}
            <div className="col-10 md:col-8 lg:col-5 md:ml-7 py-6 lg:py-0">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-text-dark dark:text-darkmode-text-dark">
                {title}
              </h1>

              <div className="flex gap-2 items-center">
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

              <div className="flex gap-4 mt-8 md:mt-10 mb-8">
                <Suspense>
                  <AddToCart
                    variants={product?.variants}
                    availableForSale={product?.availableForSale}
                    stylesClass={"btn max-md:btn-sm btn-primary"}
                    handle={null}
                    defaultVariantId={defaultVariantId}
                  />
                </Suspense>
              </div>

              <div className="mb-8 md:mb-10 bg-success/10 dark:bg-success/5 p-4 md:p-5 rounded-2xl border border-success/20">
                <p className="text-sm md:text-base text-success dark:text-darkmode-success font-medium">
                  🚚 {estimated_delivery}
                </p>
              </div>

              <div className="mb-8 md:mb-10 bg-light/50 dark:bg-darkmode-light/30 p-4 md:p-5 rounded-2xl">
                <h5 className="text-sm md:text-base font-semibold text-text-dark dark:text-darkmode-text-dark mb-3">
                  Metodi di Pagamento:
                </h5>
                <div className="flex flex-wrap items-center gap-3">
                  {payment_methods?.map(
                    (payment: { name: string; image_url: string }) => (
                      <div
                        key={payment.name}
                        className="bg-white dark:bg-darkmode-body p-2 rounded-2xl border border-border/30 dark:border-darkmode-border/30"
                        title={payment.name}
                      >
                        <Image
                          src={payment.image_url}
                          alt={`Logo ${payment.name}`}
                          width={44}
                          height={32}
                          loading="lazy"
                          className="w-[44px] h-[32px] object-contain"
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="mb-8 md:mb-10 bg-light/50 dark:bg-darkmode-light/30 p-4 md:p-5 rounded-2xl">
                <h5 className="text-sm md:text-base font-semibold text-text-dark dark:text-darkmode-text-dark mb-3">
                  Condividi:
                </h5>
                <Social socialName={title} className="social-icons" />
              </div>

              {tags.length > 0 && (
                <div className="bg-light/50 dark:bg-darkmode-light/30 p-4 md:p-5 rounded-2xl">
                  <h5 className="text-sm md:text-base font-semibold text-text-dark dark:text-darkmode-text-dark mb-3">
                    Tag:
                  </h5>
                  <div className="flex flex-wrap gap-2">
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
        <section>
          <div className="container">
            <div className="row">
              <div className="col-10 lg:col-11 mx-auto mt-12">
                <Tabs descriptionHtml={descriptionHtml} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recommended Products section  */}
      <section className="section">
        <div className="container">
          {relatedProducts?.length > 0 && (
            <>
              <div className="text-center mb-6 md:mb-14">
                <h2 className="mb-2">Related Products</h2>
              </div>
              <LatestProducts products={relatedProducts.slice(0, 4)} />
            </>
          )}
        </div>
      </section>
    </>
  );
};
