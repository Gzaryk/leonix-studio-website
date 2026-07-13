import { NextRequest, NextResponse } from "next/server";
import { addPackageToBasket, getBasket, isTebexConfigured } from "@/lib/tebex";
import { getProductBySlug } from "@/lib/products";

export async function GET(req: NextRequest) {
  const base = req.nextUrl.origin;
  const ident = req.nextUrl.searchParams.get("ident");
  const packageIdRaw = req.nextUrl.searchParams.get("package");
  const slug = req.nextUrl.searchParams.get("slug") ?? "";
  const itemsRaw = req.nextUrl.searchParams.get("items");

  if (!isTebexConfigured() || !ident) {
    return NextResponse.redirect(
      new URL(`/product/${slug || "shop"}?checkout=unavailable`, base)
    );
  }

  try {
    const items: { slug: string; quantity: number }[] = itemsRaw
      ? JSON.parse(itemsRaw)
      : packageIdRaw
        ? [{ slug, quantity: 1 }]
        : [];

    if (items.length === 0) {
      return NextResponse.redirect(
        new URL(`/shop?checkout=error`, base)
      );
    }

    for (const item of items) {
      const product = slug && !item.slug ? getProductBySlug(slug) : getProductBySlug(item.slug);
      const pid = product?.tebexPackageId ?? (packageIdRaw ? Number(packageIdRaw) : null);
      if (!pid) continue;
      await addPackageToBasket(ident, pid, item.quantity || 1);
    }

    const basket = await getBasket(ident);
    return NextResponse.redirect(basket.data.links.checkout);
  } catch (error) {
    console.error("Tebex checkout callback error:", error);
    return NextResponse.redirect(
      new URL(`/product/${slug || "shop"}?checkout=error`, base)
    );
  }
}
