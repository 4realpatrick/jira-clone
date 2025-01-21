import { useTranslations } from "next-intl";
import { ProjectAnalyticsReponse } from "@/features/projects/api/use-get-project-analytics";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AnalyticsCard } from "./card";

export function ProjectAnalytics(props: ProjectAnalyticsReponse["data"]) {
  const {
    taskCount,
    taskDifference,
    assignedTaskCount,
    assignedTaskDifference,
    completeTaskCount,
    completeTaskDifference,
    incompletTaskCount,
    incompleteTaskDifference,
    overdueTaskCount,
    overdueTaskDifference,
  } = props;
  const t = useTranslations();
  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title={t("total_tasks")}
            value={taskCount}
            variant={taskDifference > 0 ? "up" : "down"}
            increaseValue={taskDifference}
          />
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title={t("assigned_tasks")}
            value={assignedTaskCount}
            variant={assignedTaskDifference > 0 ? "up" : "down"}
            increaseValue={assignedTaskDifference}
          />
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title={t("completed_tasks")}
            value={completeTaskCount}
            variant={completeTaskDifference > 0 ? "up" : "down"}
            increaseValue={completeTaskDifference}
          />
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title={t("incompleted_tasks")}
            value={incompletTaskCount}
            variant={incompleteTaskDifference > 0 ? "up" : "down"}
            increaseValue={incompleteTaskDifference}
          />
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title={t("overdue_tasks")}
            value={overdueTaskCount}
            variant={overdueTaskDifference > 0 ? "up" : "down"}
            increaseValue={overdueTaskDifference}
          />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
}
