import { NextRequest, NextResponse } from "next/server";
import { createBasket, getBasketAuthLinks, addPackageToBasket, getBasket, isTebexConfigured } from "@/lib/tebex";
import { getProductBySlug } from "@/lib/products";
import { siteConfig } from "@/config/site";

/**
 * GET /api/tebex/checkout/start?slug=<product-slug>
 *
 * Step 1 of the checkout flow: creates a fresh Tebex basket for this
 * product and figures out whether the store requires the customer to log
 * in (Steam / FiveM via Cfx.re) before packages can be added.
 *
 *  - If login IS required, we redirect the browser to Tebex's hosted
 *    auth page. Tebex will redirect back to `/api/tebex/checkout/callback`
 *    once the basket is authorized, at which point the package gets added.
 *  - If login is NOT required for this store, we add the package and
 *    redirect straight to Tebex checkout.
 *
 * This route performs real browser redirects (not JSON), so the "Buy Now"
 * button on the client should navigate here via `window.location.href`
 * rather than `fetch`.
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!isTebexConfigured) {
    return NextResponse.redirect(
      new URL(`/product/${slug ?? ""}?checkout=unavailable`, siteConfig.url)
    );
  }

  const product = slug ? getProductBySlug(slug) : undefined;
  const packageId = product?.tebexPackageId;

  if (!product || !packageId) {
    return NextResponse.redirect(
      new URL(`/product/${slug ?? ""}?checkout=unavailable`, siteConfig.url)
    );
  }

  try {
    const basket = await createBasket({
      completeUrl: `${siteConfig.url}/shop?checkout=success`,
      cancelUrl: `${siteConfig.url}/product/${slug}?checkout=cancelled`,
      custom: { slug: product.slug },
    });

    const basketIdent = basket.data.ident;

    const callbackUrl = new URL("/api/tebex/checkout/callback", siteConfig.url);
    callbackUrl.searchParams.set("ident", basketIdent);
    callbackUrl.searchParams.set("package", String(packageId));
    callbackUrl.searchParams.set("slug", product.slug);

    const authOptions = await getBasketAuthLinks(basketIdent, callbackUrl.toString());

    if (authOptions.length > 0) {
      // Prefer a FiveM/Cfx.re login if the store offers one, otherwise
      // fall back to whatever the first configured option is.
      const preferred =
        authOptions.find((opt) => /fivem|cfx/i.test(opt.name)) ?? authOptions[0];

      return NextResponse.redirect(preferred.url);
    }

    // No auth required for this store — add the package and go straight
    // to checkout.
    await addPackageToBasket(basketIdent, packageId);
    const refreshed = await getBasket(basketIdent);
    return NextResponse.redirect(refreshed.data.links.checkout);
  } catch (error) {
    console.error("Tebex checkout start error:", error);
    return NextResponse.redirect(
      new URL(`/product/${slug ?? ""}?checkout=error`, siteConfig.url)
    );
  }
}
