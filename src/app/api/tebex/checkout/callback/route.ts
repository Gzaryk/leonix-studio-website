import { NextRequest, NextResponse } from "next/server";
import { addPackageToBasket, getBasket, isTebexConfigured } from "@/lib/tebex";
import { siteConfig } from "@/config/site";

/**
 * GET /api/tebex/checkout/callback?ident=<basketIdent>&package=<packageId>&slug=<slug>
 *
 * Step 2 of the checkout flow: Tebex redirects the customer's browser
 * here after they've successfully authenticated (Steam / FiveM via
 * Cfx.re) against the basket created in `/api/tebex/checkout/start`.
 *
 * The basket is now authorized, so adding a package will no longer 422
 * with "User must login before adding packages to basket". We add the
 * package here, then send the customer on to Tebex's hosted checkout.
 */
export async function GET(req: NextRequest) {
  const ident = req.nextUrl.searchParams.get("ident");
  const packageIdRaw = req.nextUrl.searchParams.get("package");
  const slug = req.nextUrl.searchParams.get("slug") ?? "";

  if (!isTebexConfigured || !ident || !packageIdRaw) {
    return NextResponse.redirect(
      new URL(`/product/${slug}?checkout=unavailable`, siteConfig.url)
    );
  }

  const packageId = Number(packageIdRaw);

  try {
    await addPackageToBasket(ident, packageId);
    const basket = await getBasket(ident);
    return NextResponse.redirect(basket.data.links.checkout);
  } catch (error) {
    console.error("Tebex checkout callback error:", error);
    return NextResponse.redirect(
      new URL(`/product/${slug}?checkout=error`, siteConfig.url)
    );
  }
}
