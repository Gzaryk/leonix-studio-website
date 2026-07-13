import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Leonix Studio assets, licensing, and installation.",
};

const faqs = [
  {
    question: "What is an MLO?",
    answer:
      "MLO stands for \"Map Loaded Object\" — a fully custom interior built specifically for GTA V / FiveM, as opposed to a retextured vanilla interior. All Leonix Studio interiors are original MLOs.",
  },
  {
    question: "Do your assets work with my framework?",
    answer:
      "Yes. All Leonix Studio releases are built standalone and are compatible with ESX, QBCore, QBox, and custom frameworks.",
  },
  {
    question: "How is the product delivered after purchase?",
    answer:
      "Immediately after checkout through Tebex, you'll receive access to download your files along with a full installation guide, directly from your Tebex account.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Because our products are digital goods delivered instantly, all sales are final once the download link has been accessed. If you run into an installation issue, reach out on Discord first — most issues are resolved within minutes.",
  },
  {
    question: "Will purchasing affect my server's performance?",
    answer:
      "No. Every release goes through a dedicated optimization pass, using LOD-friendly props and on-demand streaming so the interior only loads when a player is near it.",
  },
  {
    question: "Do I get future updates for free?",
    answer:
      "Yes — every purchase includes free lifetime updates for that product, including optimization passes and bug fixes.",
  },
  {
    question: "Can I resell or share the files?",
    answer:
      "No. Licenses are single-server unless otherwise agreed in writing. Reselling, redistributing, or leaking purchased files violates our Terms of Service.",
  },
  {
    question: "Do you take custom commissions?",
    answer:
      "We're currently open for select commissions. Reach out in our Discord with details about your server and vision, and our team will follow up.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked questions."
        description="Can't find what you're looking for? Reach out to us on Discord."
      />
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-20 lg:px-8">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
