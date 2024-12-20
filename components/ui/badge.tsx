import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ETaskStatus } from "@/interface/status";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        [ETaskStatus.BACKLOG]:
          "bg-muted text-muted-foreground hover:bg-muted/80",
        [ETaskStatus.TODO]: "bg-muted text-muted-foreground hover:bg-muted/80",
        [ETaskStatus.IN_PROGRESS]:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        [ETaskStatus.IN_REVIEW]: "bg-yellow-500 shadow hover:bg-yellow-500/80",
        [ETaskStatus.DONE]:
          "bg-green-500 text-primary-foreground shadow hover:bg-green-500/80",
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
