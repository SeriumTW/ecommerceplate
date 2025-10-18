import type { NavigationChildLink, NavigationLink } from "@/types/navigation";

export const isMenuItemActive = (
  item: Pick<NavigationLink, "url"> | NavigationChildLink,
  pathname: string,
) => {
  if (!item.url) {
    return false;
  }

  const normalizedPath = item.url.endsWith("/") ? item.url : `${item.url}/`;
  return pathname === item.url || pathname === normalizedPath;
};
