/**
 * lib/tebex.ts
 * -----------------------------------------------------------------------
 * Server-only module wrapping Tebex's Headless API.
 *
 * This module is intentionally the ONLY place in the codebase that talks
 * to Tebex directly. Every API route or server action should import from
 * here rather than calling `fetch` against Tebex's endpoints itself.
 *
 * IMPORTANT — Tebex basket auth flow
 * -----------------------------------------------------------------------
 * Most Tebex stores (including every store selling to a specific game
 * server, e.g. FiveM) require the customer's basket to be *authenticated*
 * before any package can be added to it. Skipping this step is what
 * produces the API's `422 User must login before adding packages to
 * basket` error.
 *
 * The correct order of operations is:
 *   1. POST /accounts/{token}/baskets            → create an empty basket
 *   2. GET  /accounts/{token}/baskets/{ident}/auth?returnUrl=...
 *                                                  → get the store's login
 *                                                    URL(s) (Steam, FiveM/
 *                                                    Cfx.re, etc.)
 *   3. Redirect the customer's browser to that login URL. Tebex handles
 *      the OAuth dance and redirects back to your `returnUrl` once the
 *      basket is authorized.
 *   4. Only now: POST /baskets/{ident}/packages   → add the package
 *   5. GET  /accounts/{token}/baskets/{ident}      → read links.checkout
 *   6. Redirect the customer to that checkout URL.
 *
 * If a store has no auth requirement configured, step 2 returns an empty
 * list — in that case we skip straight to step 4.
 *
 * Also note: package-mutation endpoints (`/baskets/{ident}/packages...`)
 * are called WITHOUT the `/accounts/{token}` prefix — the basket ident
 * alone is enough to identify the request. Only basket *creation*,
 * *lookup*, and the *auth* endpoint live under `/accounts/{token}/...`.
 * Mixing these up also produces 422s.
 *
 * Enabling real checkout is a two-step process:
 *   1. Create a store at https://creator.tebex.io and grab your
 *      "Webstore Token" from Store Settings -> API.
 *   2. Add it to `.env.local` as TEBEX_WEBSTORE_TOKEN=xxxx
 *
 * Until that token is present, every function below fails gracefully and
 * the UI falls back to a "Coming soon" state instead of crashing.
 * -----------------------------------------------------------------------
 */

import "server-only";

const TEBEX_API_BASE_URL =
    process.env.TEBEX_API_BASE_URL ?? "https://headless.tebex.io/api";

export function isTebexConfigured() {
    return Boolean(process.env.TEBEX_WEBSTORE_TOKEN);
}

function token() {
    const t = process.env.TEBEX_WEBSTORE_TOKEN;
    if (!t)
        throw new Error(
            "Tebex is not configured. Set TEBEX_WEBSTORE_TOKEN in your environment.",
        );
    return t;
}

async function tebexFetch<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${TEBEX_API_BASE_URL}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...init?.headers,
        },
        cache: init?.cache ?? "no-store",
    });

    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(
            `Tebex request failed (${res.status}): ${body || res.statusText}`,
        );
    }

    if (res.status === 204) return undefined as T;

    return res.json() as Promise<T>;
}

export interface AuthOption {
    name: string;
    url: string;
}

interface Basket {
    ident: string;
    id: number;
    complete: boolean;
    email: string | null;
    username: string | null;
    username_id?: string | number | null;
    base_price: number;
    sales_tax: number;
    total_price: number;
    currency: string;
    packages: unknown[];
    links: { payment?: string; checkout: string };
}

export async function createBasket(params: {
    completeUrl: string;
    cancelUrl: string;
    custom?: Record<string, string>;
}) {
    return tebexFetch<{ data: Basket }>(`/accounts/${token()}/baskets`, {
        method: "POST",
        body: JSON.stringify({
            complete_url: params.completeUrl,
            cancel_url: params.cancelUrl,
            complete_auto_redirect: true,
            custom: params.custom ?? {},
        }),
    });
}

export async function getBasketAuthLinks(
    basketIdent: string,
    returnUrl: string,
) {
    return tebexFetch<AuthOption[]>(
        `/accounts/${token()}/baskets/${basketIdent}/auth?returnUrl=${encodeURIComponent(returnUrl)}`,
        { method: "GET" },
    );
}

export async function addPackageToBasket(
    basketIdent: string,
    packageId: number,
    quantity = 1,
) {
    return tebexFetch<{ data: Basket }>(`/baskets/${basketIdent}/packages`, {
        method: "POST",
        body: JSON.stringify({ package_id: packageId, quantity }),
    });
}

export async function getBasket(basketIdent: string) {
    return tebexFetch<{ data: Basket }>(
        `/accounts/${token()}/baskets/${basketIdent}`,
        { cache: "no-store" },
    );
}
