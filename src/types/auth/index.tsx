export interface NavItem {
  icon: React.ReactNode;
  text: string;
  size?: "sm" | "md";
  path?: string;
  active?: boolean;
  subItem?: boolean;
  subMenu?: Omit<NavItem, "subMenu">[];
}
