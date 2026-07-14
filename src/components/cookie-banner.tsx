"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsent } from "@/lib/consent-context";

export function CookieBanner() {
    const { consent, accept, decline } = useConsent();
    const [dismissed, setDismissed] = useState(false);

    const visible = consent === null && !dismissed;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-6 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 sm:left-6 sm:translate-x-0"
                >
                    <div className="glass-strong rounded-2xl p-5 shadow-2xl">
                        <div className="flex items-start gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                <Cookie className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm leading-relaxed text-foreground/85">
                                    This site uses cookies to improve your
                                    experience. By continuing, you agree to our{" "}
                                    <Link
                                        href="/legal/privacy"
                                        className="text-primary underline underline-offset-2 hover:no-underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </div>
                            <button
                                onClick={() => setDismissed(true)}
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <Button
                                size="sm"
                                className="flex-1"
                                onClick={accept}
                            >
                                Accept
                            </Button>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="flex-1"
                                onClick={decline}
                            >
                                Decline
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
