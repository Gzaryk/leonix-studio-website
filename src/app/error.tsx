"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/shared/ambient-background";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <AmbientBackground />
      <div className="glass mb-8 flex h-16 w-16 items-center justify-center rounded-2xl text-primary">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">
        Something went wrong.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        An unexpected error occurred while loading this page. You can try again, or head back
        to the homepage.
      </p>
      <div className="mt-10 flex gap-4">
        <Button size="lg" onClick={() => reset()}>
          Try Again
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/">Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
