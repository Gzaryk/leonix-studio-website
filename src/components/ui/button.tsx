import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-tight transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(255,122,0,0.4)] hover:shadow-[0_0_30px_4px_rgba(255,122,0,0.45)] hover:-translate-y-0.5",
                secondary:
                    "glass text-foreground hover:bg-white/10 hover:-translate-y-0.5",
                outline:
                    "border border-white/20 text-foreground hover:border-primary/60 hover:text-primary",
                ghost: "text-foreground hover:bg-white/5",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-12 px-7",
                sm: "h-10 px-5 text-[13px]",
                lg: "h-14 px-9 text-base",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                data-cursor-hover
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
