export const getMenuQuery = /* GraphQL */ `
  query getMenu(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`;
