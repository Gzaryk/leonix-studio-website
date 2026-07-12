import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Legal",
  description: "Leonix Studio's legal policies — Privacy Policy and Terms of Service.",
};

const docs = [
  { title: "Privacy Policy", description: "How we collect, use, and protect your data.", href: "/legal/privacy", icon: ShieldCheck },
  { title: "Terms of Service", description: "The rules governing use of our products and website.", href: "/legal/terms", icon: FileText },
];

export default function LegalPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Policies & Terms" />
      <section className="mx-auto max-w-3xl px-6 pb-32 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {docs.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              data-cursor-hover
              className="group glass flex flex-col rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <doc.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{doc.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{doc.description}</p>
              <span className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Read more <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
