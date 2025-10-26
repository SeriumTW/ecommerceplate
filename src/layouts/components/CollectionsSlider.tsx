"use client";

import ImageFallback from "@/layouts/helpers/ImageFallback";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingCategory from "./loadings/skeleton/SkeletonCategory";

const CollectionsSlider = ({ collections }: { collections: any }) => {
  const [collectionsData, setCollectionsData] = useState([]);
  const [loadingCollectionsData, setLoadingCollectionsData] = useState(true);

  useEffect(() => {
    setCollectionsData(collections);
    setLoadingCollectionsData(false);
  }, [collections]);

  if (loadingCollectionsData) {
    return <LoadingCategory />;
  }

  return (
    <div className="relative">
      {/* Mobile: Swiper centrato con autoplay come recensioni | Desktop: grid statico */}
      <div className="md:hidden -mx-4 px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          centeredSlides={false}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass:
              "swiper-pagination-bullet !bg-primary/30 !w-2 !h-2 !mx-1",
            bulletActiveClass: "!bg-primary !w-6 !rounded-full",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
          className="!pb-10"
        >
          {collectionsData?.map((item: any) => {
            const { title, handle, image, path, products } = item;
            return (
              <SwiperSlide key={handle}>
                <div className="text-center relative group">
                  <div className="relative overflow-hidden rounded-2xl">
                    <ImageFallback
                      src={image?.url || "/images/image-placeholder.png"}
                      fallback="/images/image-placeholder.png"
                      width={424}
                      height={306}
                      alt={image?.altText || `${title} collection`}
                      className="h-[200px] md:h-[250px] lg:h-[306px] object-cover w-full transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Overlay scuro su hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="py-4 md:py-6">
                    <h3 className="mb-1 md:mb-2 font-bold text-lg md:text-xl text-text-dark dark:text-darkmode-text-dark">
                      <Link
                        className="after:absolute after:inset-0 hover:text-primary dark:hover:text-darkmode-primary transition-colors"
                        href={`/products?c=${handle}`}
                      >
                        {title}
                      </Link>
                    </h3>
                    <p className="text-text dark:text-darkmode-text text-sm md:text-base">
                      {item.products?.edges.length} prodotti
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Desktop: grid statico 3 colonne */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-6">
        {collectionsData?.map((item: any) => {
          const { title, handle, image, path, products } = item;
          return (
            <div key={handle} className="text-center relative group">
              <div className="relative overflow-hidden rounded-2xl">
                <ImageFallback
                  src={image?.url || "/images/image-placeholder.png"}
                  fallback="/images/image-placeholder.png"
                  width={424}
                  height={306}
                  alt={image?.altText || `${title} collection`}
                  className="h-[250px] lg:h-[306px] object-cover w-full transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay scuro su hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="py-4 md:py-6">
                <h3 className="mb-1 md:mb-2 font-bold text-lg md:text-xl text-text-dark dark:text-darkmode-text-dark">
                  <Link
                    className="after:absolute after:inset-0 hover:text-primary dark:hover:text-darkmode-primary transition-colors"
                    href={`/products?c=${handle}`}
                  >
                    {title}
                  </Link>
                </h3>
                <p className="text-text dark:text-darkmode-text text-sm md:text-base">
                  {item.products?.edges.length} prodotti
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionsSlider;
