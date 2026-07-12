"use client";

import * as React from "react";

interface ThemeContextValue {
  theme: "dark";
}

const ThemeContext = React.createContext<ThemeContextValue>({ theme: "dark" });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Leonix Studio ships dark-only by design (see design spec: "Dark luxury").
  // This provider exists so the rest of the app can consume `useTheme()`
  // without caring about the underlying implementation, and so a light
  // theme could be introduced later without touching consumer components.
  return (
    <ThemeContext.Provider value={{ theme: "dark" }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
