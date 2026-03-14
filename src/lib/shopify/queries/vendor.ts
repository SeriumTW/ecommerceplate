export const getVendorsQuery = /* GraphQL */ `
  query getVendors($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 250) {
      edges {
        node {
          vendor
        }
      }
    }
  }
`;

export const getTagsQuery = /* GraphQL */ `
  query getTags($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 250) {
      edges {
        node {
          tags
        }
      }
    }
  }
`;
