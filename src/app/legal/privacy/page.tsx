import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Leonix Studio's privacy policy.",
};

const sections = [
    {
        title: "1. Information We Collect",
        body: "Leonix Studio does not directly collect or store personal information through this website. When you purchase one of our products, payment processing and order management are handled by our third-party checkout provider, Tebex. We do not store payment card information.",
    },
    {
        title: "2. Information You Provide",
        body: "If you contact us for support through Discord or email, we may receive information you choose to provide, such as your Discord username, email address, order details, or technical information needed to assist you.",
    },
    {
        title: "3. Third-Party Services",
        body: "Our website uses third-party services such as Tebex for payment processing and product delivery. These services handle your information according to their own privacy policies and terms of service.",
    },
    {
        title: "4. Data Retention",
        body: "Support conversations and purchase-related information may be kept for as long as necessary to provide customer support, manage updates, resolve issues, and comply with legal obligations.",
    },
    {
        title: "5. Your Rights",
        body: "You may request access to, correction of, or deletion of personal information that you have provided to us by contacting our support team.",
    },
    {
        title: "6. Cookies",
        body: "Our website uses a small number of essential cookies to provide basic functionality, such as remembering user preferences. We also use analytics to understand overall site traffic patterns — this is optional and only activates when you accept the cookie consent banner. You can decline at any time.",
    },
    {
        title: "7. Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. Any changes will be reflected on this page. Continued use of our website after changes means you accept the updated policy.",
    },
    {
        title: "8. Contact",
        body: "If you have any questions regarding this Privacy Policy, you can contact us through Discord or email at support@leonixstudio.com.",
    },
];

export default function PrivacyPage() {
    return (
        <>
            <PageHeader
                eyebrow="Legal"
                title="Privacy Policy"
                description="Last updated: July 2026"
            />

            <section className="mx-auto max-w-3xl px-6 pb-20 pt-20 lg:px-8">
                <div className="glass space-y-8 rounded-3xl p-8 sm:p-12">
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h2 className="font-display text-lg font-semibold">
                                {section.title}
                            </h2>

                            <p className="mt-2 text-sm leading-relaxed text-muted">
                                {section.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
