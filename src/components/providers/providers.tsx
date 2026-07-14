"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "./theme-provider";
import { CartProvider } from "@/lib/cart-context";
import { ConsentProvider } from "@/lib/consent-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ConsentProvider>
      <CartProvider>
        {children}
      </CartProvider>
      </ConsentProvider>
      <Toaster
        theme="dark"
        position="bottom-right"
        closeButton
        toastOptions={{
          style: {
            background: "rgba(15,15,17,0.9)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#f5f5f4",
            backdropFilter: "blur(20px)",
          },
        }}
      />
    </ThemeProvider>
  );
}
