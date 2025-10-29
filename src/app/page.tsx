export const dynamic = "force-dynamic";

import CollectionsSlider from "@/components/CollectionsSlider";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ReviewsSection from "@/components/ReviewsSection";
import ValueProposition from "@/components/ValueProposition";
import NewsletterSignup from "@/components/NewsletterSignup";
import SkeletonCategory from "@/layouts/components/loadings/skeleton/SkeletonCategory";
import SkeletonFeaturedProducts from "@/layouts/components/loadings/skeleton/SkeletonFeaturedProducts";
import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { getCollectionProducts, getCollections } from "@/lib/shopify";
import CallToAction from "@/partials/CallToAction";
import FeaturedProducts from "@/partials/FeaturedProducts";
import SeoMeta from "@/partials/SeoMeta";
import { Suspense } from "react";

const { collections } = config.shopify;

const ShowCollections = async () => {
  const collections = await getCollections();
  return <CollectionsSlider collections={collections} />;
};

const ShowFeaturedProducts = async () => {
  const { pageInfo, products } = await getCollectionProducts({
    collection: collections.featured_products,
    reverse: false,
  });
  return <FeaturedProducts products={products} />;
};

const Home = () => {
  const callToAction = getListPage("sections/call-to-action.md");

  return (
    <>
      <SeoMeta />
      <section className="relative min-h-[650px] md:min-h-[750px] lg:min-h-[80vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2400&auto=format&fit=crop')",
            }}
          />
          {/* Overlay ottimizzato: più leggibile a sinistra, sfuma a destra */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/85 to-white/40 dark:from-black/98 dark:via-black/85 dark:to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full">
          <HeroSection />
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* category section  */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-6 md:mb-14">
            <h2 className="mb-3">Esplora per Categoria</h2>
            <p className="text-lg text-text dark:text-darkmode-text max-w-2xl mx-auto">
              Trova tutto ciò di cui il tuo amico a quattro zampe ha bisogno
            </p>
          </div>
          <Suspense fallback={<SkeletonCategory />}>
            <ShowCollections />
          </Suspense>
        </div>
      </section>

      {/* Featured Products section  */}
      <section className="pb-16">
        <div className="container">
          <div className="text-center mb-6 md:mb-14">
            <h2 className="mb-3">Prodotti in Evidenza</h2>
            <p className="text-lg text-text dark:text-darkmode-text max-w-2xl mx-auto">
              I preferiti dai nostri clienti, selezionati per qualità e
              convenienza
            </p>
          </div>
          <Suspense fallback={<SkeletonFeaturedProducts />}>
            <ShowFeaturedProducts />
          </Suspense>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Value Proposition / Chi Siamo */}
      <ValueProposition />

      {/* Newsletter Signup */}
      <NewsletterSignup />

      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
