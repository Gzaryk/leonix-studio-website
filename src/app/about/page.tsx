import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Gem, Layers, Rocket, ShieldCheck, ArrowUpRight, Map, Code2, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Cta } from "@/components/home/cta";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AmbientBackground } from "@/components/shared/ambient-background";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Leonix Studio and the vision behind our FiveM resources.",
};

const values = [
  {
    icon: Gem,
    title: "Original Projects",
    description:
      "We focus on creating resources that have their own identity instead of following the latest trends.",
  },
  {
    icon: Layers,
    title: "Attention to Detail",
    description:
      "Every release is carefully reviewed, tested, and refined before becoming available.",
  },
  {
    icon: ShieldCheck,
    title: "Built for Communities",
    description:
      "Our resources are designed to fit naturally into roleplay servers of every size.",
  },
  {
    icon: Rocket,
    title: "Looking Ahead",
    description:
      "Stock 305 is our first release, but it's only the starting point for Leonix Studio.",
  },
];

const stats = [
  { icon: Map, value: "1", label: "Products Released" },
  { icon: Code2, value: "6+", label: "Months of Development" },
  { icon: Users, value: "100+", label: "Community Members" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-20 pt-40 text-center">
        <AmbientBackground className="opacity-70" />
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={120}
            height={120}
            className="h-24 w-auto"
            priority
          />
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-xl text-balance text-muted">
            {siteConfig.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 pt-20 lg:px-8">
        <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.03]" />
          <div className="relative">
            <Badge variant="glass" className="mb-6">Our Story</Badge>
            <p className="text-lg leading-relaxed text-muted">
              Leonix Studio wasn&apos;t created to become another marketplace filled
              with hundreds of resources. It started as a personal project driven
              by the desire to build content with care, improve our skills, and
              contribute something meaningful to the FiveM community.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-muted">
              Our first public release, <span className="font-medium text-foreground">Stock 305</span>,
              represents that philosophy. It&apos;s more than just our first product —
              it&apos;s the foundation of everything we want Leonix Studio to become.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-muted">
              Whether it&apos;s maps, scripts, or entirely new concepts, our objective
              remains the same: create resources that server owners enjoy using
              and players remember.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 pt-20 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="glass" className="mb-4">What We Stand For</Badge>
          <h2 className="font-display text-3xl font-semibold">
            Our Values
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.title}
              className="glass rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <value.icon className="h-5 w-5" />
              </div>

              <h3 className="font-display text-lg font-semibold">
                {value.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
