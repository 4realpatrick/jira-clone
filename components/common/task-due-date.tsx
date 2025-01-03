import { Locale } from "@/i18n/interface";
import { cn, getDateLocale } from "@/lib/utils";
import { compareAsc, format } from "date-fns";
import { Clock, TriangleAlert } from "lucide-react";
import { useLocale } from "next-intl";
import { useMemo } from "react";

export function TaskDueDate({ dueDate }: { dueDate: string }) {
  const locale = useLocale() as Locale;
  const isOverDue = useMemo(() => {
    const today = new Date();
    const endDate = new Date(dueDate);
    return compareAsc(endDate, today) < 0;
  }, [dueDate]);
  return (
    <span
      className={cn(
        "text-sm flex items-center gap-x-2",
        isOverDue ? "text-destructive" : "text-muted-foreground"
      )}
    >
      {isOverDue ? (
        <TriangleAlert className="text-destructive size-4 shrink-0" />
      ) : (
        <Clock className="size-4 shrink-0" />
      )}
      {format(dueDate, "PPPP", {
        locale: getDateLocale(locale),
      })}
    </span>
  );
}
