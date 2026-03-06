import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#2d4f7c] bg-[#0a2342]/70 !px-3 !py-2 text-base text-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-[#9fb5cf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6200]/60 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
