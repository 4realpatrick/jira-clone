import { TPopulatedTask } from "@/interface/task";
import { Clock, MoreHorizontal, TriangleAlert } from "lucide-react";
import { TaskActions } from "../task-actions";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { MemberAvatar } from "../../member-list/avatar";
import { Hint } from "@/components/common/hint";
import { useMemo } from "react";
import { compareAsc, format } from "date-fns";
import { useLocale } from "next-intl";
import { cn, getDateLocale } from "@/lib/utils";
import { Locale } from "@/i18n/interface";

export function KanbanCard({ task }: { task: TPopulatedTask }) {
  const locale = useLocale() as Locale;
  const isOverDue = useMemo(() => {
    const today = new Date();
    const endDate = new Date(task.dueDate);
    return compareAsc(endDate, today) < 0;
  }, [task.dueDate]);

  return (
    <div className="bg-muted p-2.5 mb-1.5 rounded shadow space-y-2 text-muted-foreground">
      <div className="flex item-start justify-between gap-x-2">
        <p className="line-clamp-2">{task.name}</p>
        <TaskActions task={task}>
          <MoreHorizontal className="size-4 stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition" />
        </TaskActions>
      </div>
      {task.description && (
        <div className="line-clamp-3 text-xs">{task.description}</div>
      )}
      <DottedSeparator />
      <div className="flex items-center gap-x-2">
        {isOverDue ? (
          <TriangleAlert
            className={cn("size-4", isOverDue && "text-destructive")}
          />
        ) : (
          <Clock className="size-4" />
        )}
        <span className={cn("text-sm", isOverDue && "text-destructive")}>
          {format(task.dueDate, "PP", {
            locale: getDateLocale(locale),
          })}
        </span>
      </div>
      <div className="flex items-center gap-x-1.5 justify-end">
        <Hint descrption={task.assignee.name} sideOffset={5}>
          <MemberAvatar
            name={task.assignee.name}
            className="size-6"
            fallbackClassName="text-[10px] text-muted-foreground"
          />
        </Hint>
      </div>
    </div>
  );
}
