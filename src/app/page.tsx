import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { FeaturedProduct } from "@/components/home/featured-product";
import { Stats } from "@/components/home/stats";
import { Process } from "@/components/home/process";
import { Cta } from "@/components/home/cta";
import { getFeaturedProduct } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProduct();

  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProduct product={featured} />
      <Stats />
      <Process />
      <Cta />
    </>
  );
}
