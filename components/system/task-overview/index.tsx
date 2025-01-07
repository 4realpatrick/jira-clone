import { Pencil } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { format } from "date-fns";
import { TPopulatedTask } from "@/interface/task";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { TaskDueDate } from "@/components/common/task-due-date";
import { Badge } from "@/components/ui/badge";
import { useEditTaskModal } from "@/hooks/use-edit-task-modal";
import { Locale } from "@/i18n/interface";
import { OverviewProperty } from "./overview-property";
import { MemberAvatar } from "../member-list/avatar";
import { getDateLocale, getFormattedTime } from "@/lib/utils";

interface ITaskOverviewProps {
  task: TPopulatedTask;
}
export function TaskOverview({ task }: ITaskOverviewProps) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { open } = useEditTaskModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="rounded-lg p-4 border">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">{t("common.overview")}</p>
          <Button size="sm" variant="outline" onClick={() => open(task.$id)}>
            <Pencil className="size-4" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label={t("pages.tasks.form.labels.assignee")}>
            <MemberAvatar
              name={task.assignee.name}
              className="size-6 text-xs"
            />
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label={t("pages.tasks.form.labels.due_date")}>
            <TaskDueDate dueDate={task.dueDate} />
          </OverviewProperty>
          <OverviewProperty label={t("pages.tasks.form.labels.status")}>
            <Badge variant={task.status}>
              {t(`common.task_statuses.${task.status}`)}
            </Badge>
          </OverviewProperty>
          <OverviewProperty label={t("pages.tasks.form.labels.tags")}>
            {task.tags?.map((tag, index) => (
              <Badge key={task.$id + index}>{tag}</Badge>
            ))}
          </OverviewProperty>
          <OverviewProperty label={t("pages.tasks.table.columns.$createdAt")}>
            <span className="text-muted-foreground text-sm">
              {format(task.$createdAt, "PPPP", {
                locale: getDateLocale(locale),
              })}
            </span>
          </OverviewProperty>
          <OverviewProperty label={t("pages.tasks.table.columns.$updatedAt")}>
            <span className="text-muted-foreground text-sm">
              {getFormattedTime({
                str: task.$updatedAt,
                formatStr: "PPpp",
                locale,
              })}
            </span>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
}
