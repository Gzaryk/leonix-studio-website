export const siteConfig = {
    name: "Leonix Studio",
    shortName: "Leonix",
    tagline: "Premium FiveM Assets designed for immersive roleplay servers.",
    description:
        "Leonix Studio crafts premium, high-fidelity FiveM assets — MLOs, scripts and interiors — built for serious roleplay servers that demand cinematic quality.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    discord:
        process.env.NEXT_PUBLIC_DISCORD_URL ?? "https://discord.gg/9tJWEFUXTQ",
    logo: "/images/nav_logo.webp",
    ogImage: "/images/og-cover.webp",
    favicon: {
        png: "/images/favicon/favicon-96x96.png",
        svg: "/images/favicon/favicon.svg",
        ico: "/images/favicon/favicon.ico",
        apple: "/images/favicon/apple-touch-icon.png",
        manifest: "/images/favicon/site.webmanifest",
    },
    keywords: [
        "FiveM",
        "FiveM MLO",
        "FiveM assets",
        "GTA V roleplay",
        "FiveM scripts",
        "Leonix Studio",
        "premium MLO",
        "FiveM interior",
        "GTA V",
        "GTA V server",
        "GTA V roleplay",
    ],
    links: {
        twitter: "https://twitter.com/leonixstudio",
        discord:
            process.env.NEXT_PUBLIC_DISCORD_URL ??
            "https://discord.gg/9tJWEFUXTQ",
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
            { label: "Featured MLO", href: "/shop?category=featured" },
        ],
        Legal: [
            { label: "Terms of Service", href: "/legal/terms" },
            { label: "Privacy Policy", href: "/legal/privacy" },
        ],
    },
} as const;
