import cartFragment from "../fragments/cart";

export const addToCartMutation = /* GraphQL */ `
  mutation addToCart(
    $cartId: ID!
    $lines: [CartLineInput!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const createCartMutation = /* GraphQL */ `
  mutation createCart(
    $lineItems: [CartLineInput!]
    $buyerIdentity: CartBuyerIdentityInput
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartCreate(input: { lines: $lineItems, buyerIdentity: $buyerIdentity }) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const editCartItemsMutation = /* GraphQL */ `
  mutation editCartItems(
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = /* GraphQL */ `
  mutation removeFromCart(
    $cartId: ID!
    $lineIds: [ID!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const cartBuyerIdentityUpdateMutation = /* GraphQL */ `
  mutation cartBuyerIdentityUpdate(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;
