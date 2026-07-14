import { cn } from "@/lib/utils";

export function AmbientBackground({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
                className,
            )}
        >
            <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />
            <div className="animate-glow absolute left-1/2 top-[-10%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]" />
            <div className="animate-float absolute right-[-10%] top-[30%] h-[26rem] w-[26rem] rounded-full bg-secondary/15 blur-[130px]" />
            <div className="animate-float absolute left-[-10%] bottom-[5%] h-[24rem] w-[24rem] rounded-full bg-primary/15 blur-[130px] [animation-delay:2s]" />
            <div className="bg-noise absolute inset-0" />
        </div>
    );
}
