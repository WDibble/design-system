import * as React from "react";

export interface NavigationContextValue {
  activeItem: string | null;
  setActiveItem: (id: string | null) => void;
  closeMenu: () => void;
}

export const NavigationContext = React.createContext<NavigationContextValue | null>(null);

export function useNavigation() {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a <NavigationBar>");
  }
  return context;
}
