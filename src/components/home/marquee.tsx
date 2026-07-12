const items = [
  "CINEMATIC LIGHTING",
  "OPTIMIZED FOR FPS",
  "CUSTOM COLLISIONS",
  "FRAMEWORK AGNOSTIC",
  "FREE LIFETIME UPDATES",
  "PRIORITY DISCORD SUPPORT",
];

export function Marquee() {
  const loop = [...items, ...items];

  return (
    <div className="relative border-y border-white/10 bg-white/[0.02] py-6">
      <div className="animate-marquee flex w-max gap-16 whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={i}
            className="font-display text-sm font-medium tracking-[0.25em] text-muted/70"
          >
            {item} <span className="ml-16 text-primary">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
