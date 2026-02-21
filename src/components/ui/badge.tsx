import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-cosmos-700/50 bg-cosmos-900/50 text-cosmos-200",
        secondary:
          "border-white/5 bg-white/5 text-muted-foreground",
        success:
          "border-green-500/20 bg-green-500/10 text-green-400",
        destructive:
          "border-red-500/20 bg-red-500/10 text-red-400",
        outline: "border-white/10 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };