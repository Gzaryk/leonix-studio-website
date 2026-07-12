import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-white/5",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="glass flex flex-col overflow-hidden rounded-2xl">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="space-y-3 p-6">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}
