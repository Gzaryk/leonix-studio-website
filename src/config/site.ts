export const siteConfig = {
  name: "Leonix Studio",
  shortName: "Leonix",
  tagline: "Premium FiveM Assets designed for immersive roleplay servers.",
  description:
    "Leonix Studio crafts premium, high-fidelity FiveM assets — MLOs, scripts and interiors — built for serious roleplay servers that demand cinematic quality.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  discord: process.env.NEXT_PUBLIC_DISCORD_URL ?? "https://discord.gg/9tJWEFUXTQ",
  ogImage: "/images/og-cover.jpg",
  keywords: [
    "FiveM",
    "FiveM MLO",
    "FiveM assets",
    "GTA V roleplay",
    "FiveM scripts",
    "Leonix Studio",
    "premium MLO",
    "FiveM interior",
  ],
  links: {
    twitter: "https://twitter.com/leonixstudio",
    discord: process.env.NEXT_PUBLIC_DISCORD_URL ?? "https://discord.gg/9tJWEFUXTQ",
    tebex: "https://leonix.tebex.io",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Support", href: "/support" },
  ],
  footerNav: {
    Studio: [
      { label: "About", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "FAQ", href: "/faq" },
      { label: "Support", href: "/support" },
    ],
    Shop: [
      { label: "All Products", href: "/shop" },
      { label: "Featured MLO", href: "/product/nova-heights-penthouse" },
    ],
    Legal: [
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
    ],
  },
} as const;
