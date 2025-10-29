import LoadingProducts from "@/layouts/components/loadings/skeleton/SkeletonProducts";
import ActiveFilters from "@/components/ActiveFilters";
import CategoryHeader from "@/components/CategoryHeader";
import EmptyState from "@/components/EmptyState";
import ProductLayouts from "@/components/product/ProductLayouts";
import { defaultSort, sorting } from "@/lib/constants";
import { getListPage } from "@/lib/contentParser";
import {
  getCollectionProducts,
  getCollections,
  getHighestProductPrice,
  getProducts,
  getVendors,
} from "@/lib/shopify";
import { Collection, PageInfo, Product } from "@/lib/shopify/types";
import {
  buildProductQuery,
  extractFiltersFromSearchParams,
  hasActiveFilters,
} from "@/lib/utils/productQueryBuilder";
import CallToAction from "@/partials/CallToAction";
import ProductCardView from "@/partials/ProductCardView";
import ProductListView from "@/partials/ProductListView";
import { Suspense } from "react";

interface SearchParams {
  sort?: string;
  q?: string;
  minPrice?: string;
  maxPrice?: string;
  b?: string;
  c?: string;
  t?: string;
}

const ShowProducts = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const {
    sort,
    q: searchValue,
    minPrice,
    maxPrice,
    b: brand,
    c: category,
    t: tag,
  } = searchParams as {
    [key: string]: string;
  };

  const { layout, cursor } = searchParams as { [key: string]: string };

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  // Estrai filtri usando utility
  const filters = extractFiltersFromSearchParams(
    searchParams as { [key: string]: string | undefined },
  );
  const hasFilters = hasActiveFilters(filters);

  let productsData: { pageInfo: PageInfo | null; products: Product[] };
  let vendorsWithCounts: { vendor: string; productCount: number }[] = [];
  let categoriesWithCounts: { category: string; productCount: number }[] = [];
  let currentCategory: Collection | undefined;

  if (hasFilters) {
    // Usa utility per costruire query invece di duplicare logica
    const queryString = buildProductQuery(filters);

    const query = {
      sortKey,
      reverse,
      query: queryString,
      cursor,
    };

    productsData =
      category && category !== "all"
        ? await getCollectionProducts({
            collection: category,
            sortKey,
            reverse,
          })
        : await getProducts(query);

    const uniqueVendors: string[] = [
      ...new Set(
        ((productsData?.products as Product[]) || []).map((product: Product) =>
          String(product?.vendor || ""),
        ),
      ),
    ];

    const uniqueCategories: string[] = [
      ...new Set(
        ((productsData?.products as Product[]) || []).flatMap(
          (product: Product) =>
            product.collections.nodes.map(
              (collectionNode: any) => collectionNode.title || "",
            ),
        ),
      ),
    ];

    vendorsWithCounts = uniqueVendors.map((vendor: string) => {
      const productCount = (productsData?.products || []).filter(
        (product: Product) => product?.vendor === vendor,
      ).length;
      return { vendor, productCount };
    });

    categoriesWithCounts = uniqueCategories.map((category: string) => {
      const productCount = ((productsData?.products as Product[]) || []).filter(
        (product: Product) =>
          product.collections.nodes.some(
            (collectionNode: any) => collectionNode.title === category,
          ),
      ).length;
      return { category, productCount };
    });
  } else {
    // Fetch all products
    productsData = await getProducts({ sortKey, reverse, cursor });
  }

  const categories = await getCollections();
  const vendors = await getVendors({});

  // Trova categoria corrente se c'è
  if (category && category !== "all") {
    currentCategory = categories.find((cat) => cat.handle === category);
  }

  const tags = [
    ...new Set(
      productsData?.products.flatMap((product: Product) => product.tags),
    ),
  ];

  const maxPriceData = await getHighestProductPrice();

  const productCount = productsData?.products?.length || 0;
  const hasProducts = productCount > 0;

  return (
    <>
      {/* Hero Section con Breadcrumbs integrati */}
      <CategoryHeader
        category={currentCategory}
        searchValue={searchValue}
        productCount={productCount}
      />

      {/* Main Content con spacing verticale */}
      <div className="py-12 md:py-16">
        <div className="container">
          {/* Active Filters con chips removibili */}
          <ActiveFilters filters={filters} />

          {/* Product Layouts (sort, view toggle, filtri drawer) */}
          <Suspense>
            <ProductLayouts
              categories={categories}
              vendors={vendors}
              tags={tags}
              maxPriceData={maxPriceData}
              vendorsWithCounts={vendorsWithCounts}
              categoriesWithCounts={categoriesWithCounts}
            />
          </Suspense>

          {/* Prodotti Grid/List */}
          {!hasProducts ? (
            <EmptyState />
          ) : layout === "list" ? (
            <ProductListView
              searchParams={searchParams as Record<string, string | undefined>}
              initialProducts={productsData.products}
              initialPageInfo={productsData.pageInfo}
            />
          ) : (
            <ProductCardView
              searchParams={searchParams as Record<string, string | undefined>}
              initialProducts={productsData.products}
              initialPageInfo={productsData.pageInfo}
            />
          )}
        </div>
      </div>
    </>
  );
};

const ProductsListPage = async (props: {
  searchParams: Promise<SearchParams>;
}) => {
  const searchParams = await props.searchParams;
  const callToAction = getListPage("sections/call-to-action.md");

  return (
    <>
      {/* <PageHeader title={"Products"} /> */}
      <Suspense fallback={<LoadingProducts />}>
        <ShowProducts searchParams={searchParams} />
      </Suspense>

      <CallToAction data={callToAction} />
    </>
  );
};

export default ProductsListPage;
