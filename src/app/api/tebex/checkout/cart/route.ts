import { NextRequest, NextResponse } from "next/server";
import { createBasket, getBasketAuthLinks, addPackageToBasket, getBasket, isTebexConfigured } from "@/lib/tebex";
import { getProductBySlug } from "@/lib/products";
import { siteConfig } from "@/config/site";

export async function GET(req: NextRequest) {
  if (!isTebexConfigured) {
    return NextResponse.redirect(
      new URL("/shop?checkout=unavailable", siteConfig.url)
    );
  }

  try {
    const raw = req.nextUrl.searchParams.get("items");
    if (!raw) {
      return NextResponse.redirect(
        new URL("/shop?checkout=error", siteConfig.url)
      );
    }

    const items: { slug: string; quantity: number }[] = JSON.parse(raw);

    if (items.length === 0) {
      return NextResponse.redirect(
        new URL("/shop?checkout=error", siteConfig.url)
      );
    }

    const basket = await createBasket({
      completeUrl: `${siteConfig.url}/shop?checkout=success`,
      cancelUrl: `${siteConfig.url}/shop?checkout=cancelled`,
      custom: {},
    });

    const basketIdent = basket.data.ident;

    const callbackUrl = new URL("/api/tebex/checkout/callback", siteConfig.url);
    callbackUrl.searchParams.set("ident", basketIdent);

    const authOptions = await getBasketAuthLinks(basketIdent, callbackUrl.toString());

    if (authOptions.length > 0) {
      const preferred =
        authOptions.find((opt) => /fivem|cfx/i.test(opt.name)) ?? authOptions[0];
      return NextResponse.redirect(preferred.url);
    }

    for (const item of items) {
      const product = getProductBySlug(item.slug);
      if (!product?.tebexPackageId) continue;
      await addPackageToBasket(basketIdent, product.tebexPackageId, item.quantity);
    }

    const refreshed = await getBasket(basketIdent);
    return NextResponse.redirect(refreshed.data.links.checkout);
  } catch (error) {
    console.error("Tebex cart checkout error:", error);
    return NextResponse.redirect(
      new URL("/shop?checkout=error", siteConfig.url)
    );
  }
}
