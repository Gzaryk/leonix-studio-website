import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  className,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "glass flex flex-col items-center gap-4 rounded-3xl px-6 py-24 text-center",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        {description && <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>}
      </div>
      {children}
    </div>
  );
}
