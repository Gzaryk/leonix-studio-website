import { ProductCardSkeleton } from "@/components/shared/skeleton";

export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-40 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
