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

const WEBSTORE_TOKEN = process.env.TEBEX_WEBSTORE_TOKEN;

export function isTebexConfigured() {
  return Boolean(process.env.TEBEX_WEBSTORE_TOKEN);
}

export function getWebstoreToken() {
  const token = WEBSTORE_TOKEN ?? process.env.TEBEX_WEBSTORE_TOKEN;
  if (!token) throw new Error("Tebex is not configured. Set TEBEX_WEBSTORE_TOKEN in your environment.");
  return token;
}

/**
 * Low-level fetch wrapper. `path` is relative to `${TEBEX_API_BASE_URL}`
 * and must include whichever prefix the specific endpoint requires — some
 * endpoints need `/accounts/{token}/...`, others (basket package
 * mutations) do not. See the module doc-comment above.
 */
async function tebexFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!WEBSTORE_TOKEN) {
    throw new Error(
      "Tebex is not configured. Set TEBEX_WEBSTORE_TOKEN in your environment."
    );
  }

  const res = await fetch(`${TEBEX_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
    },
    // Basket state must never be cached; catalog reads opt into caching
    // individually via `next.revalidate`.
    cache: init?.cache ?? "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Tebex request failed (${res.status}): ${body || res.statusText}`
    );
  }

  // Tebex returns 204 No Content for a couple of mutation endpoints.
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

/**
 * Create a new basket for the current visitor. Baskets are what Tebex
 * calls a "cart" — this returns an `ident` used for subsequent basket
 * mutations, plus a checkout link once at least one package is added.
 *
 * NOTE: the returned basket generally cannot accept packages yet. Check
 * `getBasketAuthLinks` first — if it returns any options, the customer
 * must complete that login flow before `addPackageToBasket` will succeed.
 */
export async function createBasket(params: {
  completeUrl: string;
  cancelUrl: string;
  custom?: Record<string, string>;
}) {
  return tebexFetch<{ data: Basket }>(`/accounts/${WEBSTORE_TOKEN}/baskets`, {
    method: "POST",
    body: JSON.stringify({
      complete_url: params.completeUrl,
      cancel_url: params.cancelUrl,
      complete_auto_redirect: true,
      custom: params.custom ?? {},
    }),
  });
}

/**
 * Fetches the login/auth options available for a basket (e.g. Steam,
 * FiveM/Cfx.re). The customer's browser must be redirected to one of
 * these URLs, and Tebex will redirect back to `returnUrl` once the
 * basket has been authorized. Returns an empty array if the store does
 * not require authentication.
 */
export async function getBasketAuthLinks(basketIdent: string, returnUrl: string) {
  return tebexFetch<AuthOption[]>(
    `/accounts/${WEBSTORE_TOKEN}/baskets/${basketIdent}/auth?returnUrl=${encodeURIComponent(
      returnUrl
    )}`,
    { method: "GET" }
  );
}

/**
 * Add a package (product) to an existing, already-authorized basket.
 * Calling this before the customer has completed the auth flow (for
 * stores that require one) is what causes Tebex's
 * `422 User must login before adding packages to basket` error.
 *
 * Per Tebex's API, this endpoint is called WITHOUT the
 * `/accounts/{token}` prefix.
 */
export async function addPackageToBasket(
  basketIdent: string,
  packageId: number,
  quantity = 1
) {
  return tebexFetch<{ data: Basket }>(`/baskets/${basketIdent}/packages`, {
    method: "POST",
    body: JSON.stringify({ package_id: packageId, quantity }),
  });
}

/** Retrieve an existing basket, including its checkout link. */
export async function getBasket(basketIdent: string) {
  return tebexFetch<{ data: Basket }>(
    `/accounts/${WEBSTORE_TOKEN}/baskets/${basketIdent}`,
    { cache: "no-store" }
  );
}
