import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Mail, LifeBuoy, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "Support",
    description:
        "Get help with your Leonix Studio purchase — through Discord, email, or our FAQ.",
};

const channels = [
    {
        icon: MessageCircle,
        title: "Discord Support",
        description:
            "Get the fastest response from our team and community. Recommended for install help.",
        action: "Join Discord",
        href: siteConfig.discord,
        external: true,
    },
    {
        icon: Mail,
        title: "Email Us",
        description:
            "For billing, licensing, or anything you'd rather not put in a public server.",
        action: "support@leonixstudio.com",
        href: "mailto:support@leonixstudio.com",
        external: true,
    },
    {
        icon: LifeBuoy,
        title: "Read the FAQ",
        description:
            "Most installation and licensing questions are already answered here.",
        action: "View FAQ",
        href: "/faq",
        external: false,
    },
];

export default function SupportPage() {
    return (
        <>
            <PageHeader
                eyebrow="Support"
                title="We're here to help."
                description="Whether it's an install issue or a pre-purchase question, our team responds fast."
            />

            <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-3">
                    {channels.map((channel) => (
                        <div
                            key={channel.title}
                            className="glass flex flex-col rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
                        >
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                <channel.icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-display text-lg font-semibold">
                                {channel.title}
                            </h3>
                            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                                {channel.description}
                            </p>
                            {channel.external ? (
                                <a
                                    href={channel.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-cursor-hover
                                    className="mt-6 flex items-center gap-2 text-sm font-medium text-primary"
                                >
                                    {channel.action}{" "}
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                            ) : (
                                <Link
                                    href={channel.href}
                                    data-cursor-hover
                                    className="mt-6 flex items-center gap-2 text-sm font-medium text-primary"
                                >
                                    {channel.action}{" "}
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
