import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-mono text-xs tracking-wide uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400/60 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-gold-400 bg-gold-400/10 text-gold-200 hover:bg-gold-400/20 hover:text-gold-100",
        destructive:
          "border border-danger/40 bg-danger/10 text-danger hover:bg-danger/20",
        outline:
          "border border-faint/50 bg-surface-2/60 text-muted hover:border-gold-400/30 hover:text-cream",
        secondary:
          "border border-faint/30 bg-surface-2 text-cream hover:bg-surface-3",
        ghost:
          "text-muted hover:bg-surface-2 hover:text-cream",
        link: "text-gold-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
