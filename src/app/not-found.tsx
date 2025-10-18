import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";
import { Suspense } from "react";

const NotFound = async () => {
  return (
    <>
      <Suspense fallback={null}>
        <SeoMeta title={"Page Not Found"} />
      </Suspense>
      <style>{`
        header.header,
        footer {
          display: none !important;
        }
      `}</style>
      <main className="min-h-screen flex flex-col items-center justify-center bg-body dark:bg-darkmode-body px-4">
        <div className="text-center max-w-xl">
          <span className="block text-[10rem] leading-none font-bold text-primary dark:text-darkmode-primary">
            404
          </span>
          <h1 className="h2 mb-4 text-text-dark dark:text-darkmode-text">
            Pagina non trovata
          </h1>
          <p className="text-text-light dark:text-darkmode-text-light mb-8">
            La pagina che stavi cercando potrebbe essere stata rimossa,
            rinominata oppure è temporaneamente non disponibile.
          </p>
          <Link
            href="/"
            className="btn btn-primary inline-flex items-center justify-center"
          >
            Torna alla home
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
