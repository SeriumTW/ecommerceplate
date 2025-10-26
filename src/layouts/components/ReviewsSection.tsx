"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Review {
  name: string;
  rating: number;
  comment: string;
  product: string;
  date: string;
}

const ReviewsSection = () => {
  const reviews: Review[] = [
    {
      name: "Maria R.",
      rating: 5,
      comment:
        "Prodotti di qualità eccellente! Il mio cane adora gli snack naturali e sono arrivati in tempi rapidissimi. Confezione curata nei minimi dettagli.",
      product: "Snack Naturali per Cani",
      date: "2 giorni fa",
    },
    {
      name: "Luca T.",
      rating: 5,
      comment:
        "Finalmente un e-commerce serio per animali. Assistenza clienti disponibile e prodotti testati. La mia gatta è felicissima del nuovo tiragraffi!",
      product: "Tiragraffi Deluxe",
      date: "1 settimana fa",
    },
    {
      name: "Giulia M.",
      rating: 5,
      comment:
        "Servizio impeccabile. Ho avuto un problema con la spedizione e mi hanno risposto in 10 minuti risolvendo tutto. Tornerò sicuramente!",
      product: "Cuccia Memory Foam",
      date: "3 giorni fa",
    },
    {
      name: "Alessandro P.",
      rating: 5,
      comment:
        "Prezzi competitivi e prodotti top. Il cibo biologico che ho ordinato ha migliorato la digestione del mio cane. Consigliatissimo!",
      product: "Cibo Biologico Premium",
      date: "5 giorni fa",
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-lg ${
              index < rating
                ? "text-rating-gold"
                : "text-border dark:text-darkmode-border"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-light/30 dark:from-black dark:to-darkmode-light/10">
      <div className="container">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="mb-3">Cosa Dicono i Nostri Clienti</h2>
          <p className="text-lg text-text dark:text-darkmode-text max-w-2xl mx-auto">
            Oltre 500 recensioni positive da proprietari soddisfatti
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletClass: "review-pagination-bullet",
            bulletActiveClass: "review-pagination-bullet-active",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white dark:bg-darkmode-body p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all h-full border border-border/20 dark:border-darkmode-border/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-text-dark dark:text-darkmode-text-dark mb-1">
                      {review.name}
                    </h4>
                    <p className="text-sm text-text dark:text-darkmode-text">
                      {review.date}
                    </p>
                  </div>
                  {renderStars(review.rating)}
                </div>

                <p className="text-text dark:text-darkmode-text mb-4 leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>

                <div className="pt-4 border-t border-border/30 dark:border-darkmode-border/30">
                  <p className="text-sm font-medium text-primary dark:text-darkmode-primary">
                    📦 {review.product}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary dark:text-darkmode-primary mb-1">
              10.000+
            </div>
            <p className="text-sm text-text dark:text-darkmode-text">
              Prodotti Venduti
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary dark:text-darkmode-primary mb-1">
              4.9/5
            </div>
            <p className="text-sm text-text dark:text-darkmode-text">
              Valutazione Media
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary dark:text-darkmode-primary mb-1">
              98%
            </div>
            <p className="text-sm text-text dark:text-darkmode-text">
              Clienti Soddisfatti
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
