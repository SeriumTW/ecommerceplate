import React from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ValueProposition = () => {
  const t = useTranslations("valueProposition");

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-darkmode-body">
      <div className="container">
        <div className="row items-center gap-y-10">
          {/* Content */}
          <div className="lg:col-6">
            <div className="lg:pr-12">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold rounded-full bg-primary/10 text-primary dark:bg-darkmode-primary/10 dark:text-darkmode-primary">
                {t("badge")}
              </span>
              <h2 className="mb-4">{t("title")}</h2>
              <p className="text-lg text-text dark:text-darkmode-text mb-6 leading-relaxed">
                {t.rich("paragraphOne", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
              <p className="text-lg text-text dark:text-darkmode-text mb-8 leading-relaxed">
                {t.rich("paragraphTwo", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>

              {/* Value points */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 dark:bg-darkmode-success/20 flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-success dark:text-darkmode-success"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark dark:text-darkmode-text-dark mb-1">
                      {t("naturalIngredientsTitle")}
                    </h4>
                    <p className="text-text dark:text-darkmode-text">
                      {t("naturalIngredientsDescription")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 dark:bg-darkmode-success/20 flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-success dark:text-darkmode-success"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark dark:text-darkmode-text-dark mb-1">
                      {t("teamTestedTitle")}
                    </h4>
                    <p className="text-text dark:text-darkmode-text">
                      {t("teamTestedDescription")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 dark:bg-darkmode-success/20 flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-success dark:text-darkmode-success"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark dark:text-darkmode-text-dark mb-1">
                      {t("sustainabilityTitle")}
                    </h4>
                    <p className="text-text dark:text-darkmode-text">
                      {t("sustainabilityDescription")}
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/about" className="btn btn-primary">
                {t("cta")}
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1200&auto=format&fit=crop"
                alt={t("imageAlt")}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-darkmode-body/95 backdrop-blur-sm p-4 rounded-2xl">
                <p className="text-sm font-bold text-text-dark dark:text-darkmode-text-dark mb-1">
                  {t("commitmentTitle")}
                </p>
                <p className="text-xs text-text dark:text-darkmode-text">
                  {t("commitmentDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
