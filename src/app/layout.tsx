import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Providers } from "@/components/providers/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/shared/custom-cursor";
import { ScrollProgress } from "@/components/shared/scroll-progress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Premium FiveM Assets`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — Premium FiveM Assets`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Premium FiveM Assets`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background font-sans text-foreground antialiased">
        <Providers>
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
