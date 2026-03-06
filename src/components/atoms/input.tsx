import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-sm border border-faint/40 bg-surface-1 px-3 py-2 font-mono text-sm text-cream placeholder:text-faint transition-colors duration-200 focus-visible:border-gold-400/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400/20 disabled:cursor-not-allowed disabled:opacity-40",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
