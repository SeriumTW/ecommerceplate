import SkeletonCards from "./SkeletonCards";

const SkeletonProducts = () => {
  return (
    <>
      {/* Hero Skeleton */}
      <section>
        <div className="text-center">
          <div className="bg-gradient-to-b from-body to-light px-8 py-14 md:py-20 dark:from-darkmode-body dark:to-darkmode-light">
            {/* Title */}
            <div className="h-10 md:h-12 lg:h-14 w-2/3 mx-auto mb-4 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />

            {/* Product count */}
            <div className="h-5 md:h-6 w-32 mx-auto mb-6 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />

            {/* Breadcrumbs */}
            <div className="h-4 w-48 mx-auto rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 md:py-16">
        <div className="container">
          {/* Product Layouts Skeleton (Filtri + Sort) */}
          <section className="py-4 md:py-6">
            <div className="container">
              <div className="flex items-center justify-between gap-3 mb-6">
                {/* Button Filtri Skeleton */}
                <div className="h-10 w-10 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />

                {/* Sort Skeleton */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:block h-5 w-16 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-10 w-32 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                </div>
              </div>
            </div>
          </section>

          {/* Products Grid Skeleton */}
          <SkeletonCards />
        </div>
      </div>
    </>
  );
};

export default SkeletonProducts;
