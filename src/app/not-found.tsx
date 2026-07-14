import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/shared/ambient-background";

export default function NotFound() {
    return (
        <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
            <AmbientBackground />
            <span className="font-display text-[10rem] font-bold leading-none text-gradient sm:text-[14rem]">
                404
            </span>
            <div className="glass mb-8 flex h-14 w-14 items-center justify-center rounded-2xl text-primary">
                <Compass className="h-6 w-6" />
            </div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">
                Looks like this interior doesn&apos;t exist.
            </h1>
            <p className="mt-4 max-w-md text-muted">
                The page you&apos;re looking for may have moved, or never
                existed. Let&apos;s get you back to somewhere real.
            </p>
            <div className="mt-10 flex gap-4">
                <Button asChild size="lg">
                    <Link href="/">Back Home</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                    <Link href="/shop">Browse Shop</Link>
                </Button>
            </div>
        </div>
    );
}
