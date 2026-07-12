export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute h-full w-full animate-ping rounded-full bg-primary/30" />
        <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-display text-lg font-bold text-background">
          L
        </span>
      </div>
      <span className="shimmer-text font-display text-sm uppercase tracking-[0.3em]">
        Loading Leonix Studio
      </span>
    </div>
  );
}
