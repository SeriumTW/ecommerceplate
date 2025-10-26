"use client";

import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="container">
      <div className="row items-center min-h-[500px] md:min-h-[600px]">
        {/* Content */}
        <div className="col-12 lg:col-7 text-center lg:text-left py-12 lg:py-0">
          {/* Badge trust */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-success/15 text-success text-sm font-bold backdrop-blur-sm border border-success/30">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Spedizione Gratuita oltre 49€
          </div>

          {/* Headline UVP */}
          <h1 className="mb-4 text-5xl md:text-6xl lg:text-7xl font-bold text-text-dark dark:text-darkmode-text-dark leading-[1.1]">
            Il Meglio per i Tuoi Amici a Quattro Zampe
          </h1>

          {/* Subheadline breve */}
          <p className="mb-6 text-xl md:text-2xl text-text dark:text-darkmode-text max-w-xl mx-auto lg:mx-0 font-medium">
            Prodotti naturali testati e selezionati con cura
          </p>

          {/* Social proof inline minimale */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
            <div className="flex items-center gap-1.5">
              <span className="text-rating-gold text-lg">★★★★★</span>
              <span className="text-text-dark dark:text-darkmode-text font-semibold text-sm">
                4.9/5
              </span>
            </div>
            <span className="text-text/60 dark:text-darkmode-text/60 text-sm">
              • 500+ recensioni
            </span>
          </div>

          {/* CTA Unica */}
          <Link
            className="btn btn-lg inline-flex items-center gap-2 px-8 py-4 font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            style={{
              backgroundColor: "#FF7A59",
              color: "#FFFFFF",
              borderColor: "#FF7A59",
            }}
            href="/products"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FF6342";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FF7A59";
            }}
          >
            Scopri i Prodotti
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {/* Visual space placeholder */}
        <div className="col-12 lg:col-5 hidden lg:block" />
      </div>
    </div>
  );
};

export default HeroSection;
