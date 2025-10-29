const SkeletonAccount = () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Profilo Utente Skeleton */}
            <div className="bg-white dark:bg-darkmode-body border border-border dark:border-darkmode-border rounded-2xl p-6 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar Skeleton */}
                <div className="flex-shrink-0">
                  <div className="h-24 w-24 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                </div>
                {/* Info Skeleton */}
                <div className="flex-1 w-full">
                  <div className="h-7 w-48 mb-2 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-5 w-64 mb-1 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-5 w-48 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                </div>
              </div>
            </div>

            {/* Menu Opzioni Skeleton */}
            <div className="grid md:grid-cols-2 gap-4">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-darkmode-body border border-border dark:border-darkmode-border rounded-2xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon Skeleton */}
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                      </div>
                      {/* Testo Skeleton */}
                      <div className="flex-1">
                        <div className="h-6 w-32 mb-2 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                        <div className="h-4 w-full mb-1 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                        <div className="h-4 w-3/4 rounded animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                      </div>
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

export default SkeletonAccount;

