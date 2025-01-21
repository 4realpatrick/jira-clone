import { useTranslations } from "next-intl";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CardSkeleton } from "./card-skeleton";

export function ProjectAnalyticsSkeleton() {
  const t = useTranslations();
  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <CardSkeleton title={t("total_tasks")} />
        <Separator orientation="vertical" className="h-auto" />
        <CardSkeleton title={t("assigned_tasks")} />
        <Separator orientation="vertical" className="h-auto" />
        <CardSkeleton title={t("completed_tasks")} />
        <Separator orientation="vertical" className="h-auto" />
        <CardSkeleton title={t("incompleted_tasks")} />
        <Separator orientation="vertical" className="h-auto" />
        <CardSkeleton title={t("overdue_tasks")} />
      </div>
      <ScrollBar />
    </ScrollArea>
  );
}
