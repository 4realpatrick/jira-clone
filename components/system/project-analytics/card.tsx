import {
  TbCaretDownFilled,
  TbCaretUpFilled,
  TbCaretUpDownFilled,
} from "react-icons/tb";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IAnalyticsCardProps {
  title: string;
  value: number;
  variant: "up" | "down";
  increaseValue: number;
}

export function AnalyticsCard({
  title,
  value,
  increaseValue,
}: IAnalyticsCardProps) {
  const variant =
    increaseValue > 0 ? "up" : increaseValue < 0 ? "down" : "equal";
  const variantObj = {
    up: {
      icon: <TbCaretUpFilled className="size-4 text-emerald-500" />,
      color: "text-emerald-500",
    },
    down: {
      icon: <TbCaretDownFilled className="size-4 text-red-500" />,
      color: "text-emerald-500",
    },
    equal: {
      icon: <TbCaretUpDownFilled className="size-4 text-muted-foreground" />,
      color: "text-muted-foreground",
    },
  };
  return (
    <Card className="w-full shadow-none border-none">
      <CardHeader>
        <div className="flex items-center gap-x-2.5">
          <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
            <span className="truncate text-base">{title}</span>
          </CardDescription>
          <div className="flex items-center gap-x-1">
            {variantObj[variant].icon}
            <span
              className={cn(
                "truncate text-base font-medium",
                variantObj[variant].color
              )}
            >
              {increaseValue}
            </span>
          </div>
        </div>
        <CardTitle className="text-3xl font-semibold">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}
