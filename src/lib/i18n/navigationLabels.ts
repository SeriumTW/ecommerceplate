import type {
  NavigationChildLink,
  NavigationLink,
  TopBarLink,
} from "@/types/navigation";

type Translator = (
  key: string,
  values?: Record<string, string | number>,
) => string;

export const getNavigationItemLabel = (
  item: NavigationLink | NavigationChildLink,
  tCommon: Translator,
  tNav: Translator,
) => {
  switch (item.url) {
    case "/":
      return tCommon("home");
    case "/products":
      return tCommon("products");
    case "/about":
      return tCommon("about");
    case "/contact":
      return tCommon("contact");
    case "/404":
      return tNav("notFoundPage");
    default:
      return item.name === "Pages" ? tNav("pages") : item.name;
  }
};

export const getTopBarLinkLabel = (item: TopBarLink, tTopbar: Translator) => {
  switch (item.url) {
    case "/contact":
      return tTopbar("supportLink");
    case "/account":
      return tTopbar("orderTrackingLink");
    default:
      return item.label;
  }
};

export const getFooterLinkLabel = (
  href: string,
  fallback: string,
  tCommon: Translator,
) => {
  switch (href) {
    case "/about":
      return tCommon("about");
    case "/products":
      return tCommon("products");
    case "/contact":
      return tCommon("contact");
    case "/privacy-policy":
      return tCommon("privacyPolicy");
    case "/terms-services":
      return tCommon("termsOfService");
    default:
      return fallback;
  }
};
