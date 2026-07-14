"use client";

import { Analytics } from "@vercel/analytics/react";
import { useConsent } from "@/lib/consent-context";

export function AnalyticsWrapper() {
  const { consent } = useConsent();
  if (consent !== "accepted") return null;
  return <Analytics />;
}
