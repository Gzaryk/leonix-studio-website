import { NextRequest, NextResponse } from "next/server";
import { addPackageToBasket, getBasket, isTebexConfigured } from "@/lib/tebex";

export async function GET(req: NextRequest) {
    const base = req.nextUrl.origin;
    const ident = req.nextUrl.searchParams.get("ident");
    const packageIdRaw = req.nextUrl.searchParams.get("package");
    const slug = req.nextUrl.searchParams.get("slug") ?? "";

    if (!isTebexConfigured() || !ident || !packageIdRaw) {
        return NextResponse.redirect(
            new URL(`/product/${slug}?checkout=unavailable`, base),
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
            new URL(`/product/${slug}?checkout=error`, base),
        );
    }
}
