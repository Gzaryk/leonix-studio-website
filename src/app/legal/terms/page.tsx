import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Leonix Studio's terms of service.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By purchasing or downloading any product from Leonix Studio, you agree to be bound by these Terms of Service.",
  },
  {
    title: "2. License Grant",
    body: "Each purchase grants a single-server, non-exclusive, non-transferable license to use the purchased asset on one FiveM server. Additional server licenses may be purchased separately.",
  },
  {
    title: "3. Restrictions",
    body: "You may not resell, redistribute, share, or leak any purchased files, in whole or in part, in source or compiled form, without explicit written permission from Leonix Studio.",
  },
  {
    title: "4. Payments",
    body: "All payments are processed securely through Tebex. Prices are listed in EUR unless otherwise noted and are subject to change without notice for future purchases.",
  },
  {
    title: "5. Refunds",
    body: "Due to the digital nature of our products, all sales are final once files have been accessed. Refund requests are evaluated on a case-by-case basis for undelivered or non-functional products.",
  },
  {
    title: "6. Updates & Support",
    body: "Purchases include free lifetime updates for the purchased product and access to community support through our Discord server.",
  },
  {
    title: "7. Termination",
    body: "Leonix Studio reserves the right to revoke license access for any user found violating these Terms of Service, including unauthorized redistribution of purchased assets.",
  },
  {
    title: "8. Disclaimer",
    body: "Leonix Studio is an independent development studio and is not affiliated with, endorsed by, or connected to Rockstar Games, Take-Two Interactive, or Cfx.re beyond standard platform usage.",
  },
  {
    title: "9. Changes to Terms",
    body: "We may revise these Terms of Service at any time. Continued use of our products after changes constitutes acceptance of the revised terms.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" description="Last updated: July 2026" />
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-20 lg:px-8">
        <div className="glass space-y-8 rounded-3xl p-8 sm:p-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-lg font-semibold">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
