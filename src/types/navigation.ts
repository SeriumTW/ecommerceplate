export interface NavigationChildLink {
  name: string;
  url: string;
}

export interface NavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: NavigationChildLink[];
  hiddenOnMobile?: boolean;
}

export interface TopBarLink {
  label: string;
  url: string;
}
