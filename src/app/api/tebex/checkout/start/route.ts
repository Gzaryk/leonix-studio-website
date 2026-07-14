import { NextRequest, NextResponse } from "next/server";
import {
    createBasket,
    getBasketAuthLinks,
    addPackageToBasket,
    getBasket,
    isTebexConfigured,
} from "@/lib/tebex";
import { getProductBySlug } from "@/lib/products";

const origin = (req: NextRequest) => req.nextUrl.origin;

export async function GET(req: NextRequest) {
    const base = origin(req);
    const slug = req.nextUrl.searchParams.get("slug");

    if (!isTebexConfigured()) {
        return NextResponse.redirect(
            new URL(`/product/${slug ?? ""}?checkout=unavailable`, base),
        );
    }

    const product = slug ? getProductBySlug(slug) : undefined;
    const packageId = product?.tebexPackageId;

    if (!product || !packageId) {
        return NextResponse.redirect(
            new URL(`/product/${slug ?? ""}?checkout=unavailable`, base),
        );
    }

    try {
        const basket = await createBasket({
            completeUrl: `${base}/shop?checkout=success`,
            cancelUrl: `${base}/product/${slug}?checkout=cancelled`,
            custom: { slug: product.slug },
        });

        const basketIdent = basket.data.ident;

        const callbackUrl = new URL("/api/tebex/checkout/callback", base);
        callbackUrl.searchParams.set("ident", basketIdent);
        callbackUrl.searchParams.set("package", String(packageId));
        callbackUrl.searchParams.set("slug", product.slug);

        const authOptions = await getBasketAuthLinks(
            basketIdent,
            callbackUrl.toString(),
        );

        if (authOptions.length > 0) {
            const preferred =
                authOptions.find((opt) => /fivem|cfx/i.test(opt.name)) ??
                authOptions[0];
            return NextResponse.redirect(preferred.url);
        }

        await addPackageToBasket(basketIdent, packageId);
        const refreshed = await getBasket(basketIdent);
        return NextResponse.redirect(refreshed.data.links.checkout);
    } catch (error) {
        console.error("Tebex checkout start error:", error);
        return NextResponse.redirect(
            new URL(`/product/${slug ?? ""}?checkout=error`, base),
        );
    }
}
