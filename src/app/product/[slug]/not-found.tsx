import Link from "next/link";
import { PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/shared/ambient-background";

export default function ProductNotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <AmbientBackground />
      <div className="glass mb-8 flex h-16 w-16 items-center justify-center rounded-2xl text-primary">
        <PackageX className="h-7 w-7" />
      </div>
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">
        We couldn&apos;t find that product.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        It may have been renamed or removed from the catalog. Take a look at everything
        currently available.
      </p>
      <Button asChild size="lg" className="mt-10">
        <Link href="/shop">Browse Shop</Link>
      </Button>
    </div>
  );
}
