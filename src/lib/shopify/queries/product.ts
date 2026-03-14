import productFragment from "../fragments/product";

export const getProductQuery = /* GraphQL */ `
  query getProduct(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts(
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
    $cursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(
      sortKey: $sortKey
      reverse: $reverse
      query: $query
      first: 12
      after: $cursor
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations(
    $productId: ID!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;

export const getHighestProductPriceQuery = /* GraphQL */ `
  query getHighestProductPrice($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 1, sortKey: PRICE, reverse: true) {
      edges {
        node {
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;
