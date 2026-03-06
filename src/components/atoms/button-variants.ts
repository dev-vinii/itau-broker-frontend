import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6200]/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#ff6200] text-white hover:bg-[#e65a00]",
        destructive: "bg-red-600 text-white hover:bg-red-500",
        outline:
          "border border-[#2d4f7c] bg-[#0a2342]/70 text-[#d9e8ff] hover:bg-[#123b6b]/70",
        secondary: "bg-[#123b6b] text-[#d9e8ff] hover:bg-[#1b4d87]",
        ghost: "text-[#d9e8ff] hover:bg-[#ff6200]/10 hover:text-white",
        link: "text-[#ff8a3d] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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
