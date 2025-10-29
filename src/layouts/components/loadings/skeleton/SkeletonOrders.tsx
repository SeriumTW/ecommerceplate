const SkeletonOrders = () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-darkmode-body border border-border dark:border-darkmode-border rounded-2xl p-6"
                  >
                    {/* Header Ordine Skeleton */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-border/20 dark:border-darkmode-border/20">
                      <div className="flex-1">
                        {/* Titolo ordine */}
                        <div className="h-6 w-32 mb-2 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                        {/* Data */}
                        <div className="h-4 w-40 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                      </div>
                      <div className="flex flex-col md:items-end gap-2">
                        {/* Prezzo */}
                        <div className="h-7 w-24 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                        {/* Badge status */}
                        <div className="flex gap-2">
                          <div className="h-6 w-20 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                          <div className="h-6 w-24 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                        </div>
                      </div>
                    </div>

                    {/* Line Items Skeleton */}
                    <div className="space-y-3">
                      {Array(2)
                        .fill(0)
                        .map((_, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex gap-4 items-start"
                          >
                            {/* Immagine prodotto */}
                            <div className="flex-shrink-0">
                              <div className="w-20 h-20 rounded-2xl animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                            </div>
                            {/* Dettagli prodotto */}
                            <div className="flex-1 min-w-0">
                              <div className="h-5 w-3/4 mb-2 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                              <div className="h-4 w-1/2 mb-2 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                              <div className="flex items-center gap-4 mt-2">
                                <div className="h-4 w-16 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                                <div className="h-4 w-20 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SkeletonOrders;

