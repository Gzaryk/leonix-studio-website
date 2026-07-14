import { NextRequest, NextResponse } from "next/server";
import { createBasket, getBasket, isTebexConfigured } from "@/lib/tebex";

export async function POST() {
    if (!isTebexConfigured()) {
        return NextResponse.json(
            { error: "Tebex is not configured yet." },
            { status: 503 },
        );
    }

    try {
        const basket = await createBasket({
            completeUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/shop?checkout=success`,
            cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/shop?checkout=cancelled`,
        });

        return NextResponse.json(basket);
    } catch (error) {
        console.error("Tebex basket creation error:", error);
        return NextResponse.json(
            { error: "Failed to create basket." },
            { status: 500 },
        );
    }
}

export async function GET(req: NextRequest) {
    const ident = req.nextUrl.searchParams.get("ident");

    if (!ident) {
        return NextResponse.json(
            { error: "Missing basket ident." },
            { status: 400 },
        );
    }

    if (!isTebexConfigured()) {
        return NextResponse.json(
            { error: "Tebex is not configured yet." },
            { status: 503 },
        );
    }

    try {
        const basket = await getBasket(ident);
        return NextResponse.json(basket);
    } catch (error) {
        console.error("Tebex basket fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch basket." },
            { status: 500 },
        );
    }
}
