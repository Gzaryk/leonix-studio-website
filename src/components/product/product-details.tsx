"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Product } from "@/types";
import { fadeUp, revealViewport } from "@/lib/animations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeUp}
      className="mt-24"
    >
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <p className="max-w-3xl text-base leading-relaxed text-muted">
            {product.description}
          </p>
        </TabsContent>

        <TabsContent value="requirements">
          <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
            {product.requirements.map((req) => (
              <li key={req} className="glass flex items-start gap-3 rounded-xl p-4 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {req}
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="installation">
          <div className="max-w-3xl space-y-4">
            {product.installation.map((step, i) => (
              <div key={step.title} className="glass flex gap-5 rounded-2xl p-6">
                <span className="font-display text-2xl font-bold text-primary/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-display font-semibold">{step.title}</h4>
                  <p className="mt-1 text-sm text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <Accordion type="single" collapsible className="max-w-3xl space-y-3">
            {product.faq.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
