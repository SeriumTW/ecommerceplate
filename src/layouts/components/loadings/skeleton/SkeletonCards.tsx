const SkeletonCards = () => {
  return (
    <div className="row gy-5">
      {Array(9)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index} className="col-12 sm:col-6 md:col-4">
              {/* Skeleton Card */}
              <div className="bg-white dark:bg-darkmode-body border border-border/60 dark:border-darkmode-border/60 rounded-2xl overflow-hidden h-full flex flex-col">
                {/* Image Skeleton - Square */}
                <div className="aspect-square bg-neutral-200 dark:bg-neutral-700 animate-pulse" />

                {/* Info Box Skeleton */}
                <div className="p-3 md:p-4 flex-1 flex flex-col gap-2 md:gap-3">
                  {/* Title Skeleton (2 lines) */}
                  <div className="space-y-2">
                    <div className="h-4 md:h-5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-full" />
                    <div className="h-4 md:h-5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-3/4" />
                  </div>

                  {/* Price + Button Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    {/* Price Skeleton */}
                    <div className="h-6 md:h-8 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-20 md:w-24" />

                    {/* Button Skeleton */}
                    <div className="h-9 md:h-11 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-full sm:w-28 md:w-32" />
                  </div>

                  {/* Color Swatches Skeleton */}
                  <div className="flex items-center gap-1.5 mt-auto pt-1">
                    {Array(4)
                      .fill(0)
                      .map((_, idx) => (
                        <div
                          key={idx}
                          className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SkeletonCards;
