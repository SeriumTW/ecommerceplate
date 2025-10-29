import SkeletonDescription from "./SkeletonDescription";
import SkeletonCards from "./SkeletonCards";

const SkeletonProductGallery = () => {
  return (
    <>
      <section className="md:section-sm">
        <div className="container">
          {/* Breadcrumbs Skeleton */}
          <div className="row">
            <div className="col-12">
              <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-20 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                  <span className="text-text-light dark:text-darkmode-text-light">/</span>
                  <div className="h-4 w-32 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-center">
            {/* Right side - Gallery */}
            <div className="col-10 md:col-8 lg:col-5">
              {/* Main Image Skeleton */}
              <div className="h-[323px] md:h-[450px] lg:h-[623px] rounded-2xl border border-border dark:border-darkmode-border animate-pulse bg-neutral-200 dark:bg-neutral-700 mb-4" />

              {/* Thumbnails Skeleton */}
              <div className="grid grid-cols-4 gap-x-4">
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="h-[80px] md:h-[120px] lg:h-[146px] rounded-2xl border border-border dark:border-darkmode-border animate-pulse bg-neutral-200 dark:bg-neutral-700"
                    />
                  ))}
              </div>
            </div>

            {/* Left side - Product Info */}
            <div className="col-10 md:col-8 lg:col-6 md:ml-7 py-6 lg:py-0">
              {/* Title Skeleton */}
              <div className="h-8 md:h-10 lg:h-12 w-3/4 mb-4 md:mb-6 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />

              {/* Price Skeleton */}
              <div className="flex gap-2 items-center mb-4">
                <div className="h-7 md:h-8 w-32 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-5 w-24 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
              </div>

              {/* Stock Indicator Skeleton */}
              <div className="h-6 w-40 mb-6 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700" />

              {/* Variant Selector Skeleton */}
              <div className="my-8 md:my-10 space-y-6 md:space-y-8">
                <div className="space-y-4">
                  {/* Option Label */}
                  <div className="h-5 w-24 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                  {/* Option Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="h-10 w-16 rounded-lg animate-pulse bg-neutral-200 dark:bg-neutral-700"
                        />
                      ))}
                  </div>
                </div>
              </div>

              {/* Product Actions Skeleton */}
              <div className="space-y-4 mb-8">
                {/* Quantity Selector */}
                <div className="h-12 w-36 rounded-2xl animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                {/* Add to Cart Button */}
                <div className="h-14 md:h-14 w-full rounded-2xl animate-pulse bg-neutral-200 dark:bg-neutral-700" />
              </div>

              {/* Trust Badges Skeleton */}
              <div className="my-8 md:my-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="h-16 md:h-20 rounded-2xl animate-pulse bg-neutral-200 dark:bg-neutral-700"
                      />
                    ))}
                </div>
              </div>

              {/* Social Share Skeleton */}
              <div className="mb-8 md:mb-10 bg-light/50 dark:bg-darkmode-light/30 p-4 md:p-5 rounded-2xl">
                <div className="h-5 w-24 mb-3 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                <div className="flex gap-2">
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="h-10 w-10 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700"
                      />
                    ))}
                </div>
              </div>

              {/* Tags Skeleton */}
              <div className="bg-light/50 dark:bg-darkmode-light/30 p-4 md:p-5 rounded-2xl">
                <div className="h-5 w-16 mb-3 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                <div className="flex flex-wrap gap-2">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="h-8 w-20 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700"
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description/Tabs Skeleton */}
      <section className="pt-2 pb-16 md:pb-20">
        <div className="container">
          <div className="row">
            <div className="col-10 lg:col-11 mx-auto">
              <SkeletonDescription />
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products Skeleton */}
      <section className="pt-8 md:pt-12 pb-16 md:pb-20">
        <div className="container">
          <div className="text-center mb-6 md:mb-10">
            <div className="h-8 w-48 mx-auto rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
          </div>
          <div className="row gy-5 justify-center items-stretch">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="col-6 sm:col-4 md:col-4 lg:col-3 flex items-stretch"
                >
                  <div className="bg-white dark:bg-darkmode-body border border-border/60 dark:border-darkmode-border/60 rounded-2xl overflow-hidden h-full flex flex-col w-full">
                    {/* Image Skeleton */}
                    <div className="aspect-square bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                    {/* Info Box Skeleton */}
                    <div className="p-3 md:p-4 flex-1 flex flex-col gap-2 md:gap-3">
                      {/* Title Skeleton */}
                      <div className="space-y-2">
                        <div className="h-4 md:h-5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-full" />
                        <div className="h-4 md:h-5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-3/4" />
                      </div>
                      {/* Price + Button Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="h-6 md:h-8 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-20 md:w-24" />
                        <div className="h-9 md:h-11 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-full sm:w-28 md:w-32" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SkeletonProductGallery;
