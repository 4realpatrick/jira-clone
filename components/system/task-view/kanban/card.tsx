import { useMemo } from "react";
import { compareAsc, format } from "date-fns";
import { useLocale } from "next-intl";
import { Clock, MoreHorizontal, TriangleAlert } from "lucide-react";
import { TPopulatedTask } from "@/interface/task";
import { Hint } from "@/components/common/hint";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { cn, getDateLocale } from "@/lib/utils";
import { Locale } from "@/i18n/interface";
import { TaskActions } from "../task-actions";
import { MemberAvatar } from "../../member-list/avatar";
import { Badge } from "@/components/ui/badge";

export function KanbanCard({ task }: { task: TPopulatedTask }) {
  const { dueDate, name, assignee, description, tags = [] } = task;
  const locale = useLocale() as Locale;
  const isOverDue = useMemo(() => {
    const today = new Date();
    const endDate = new Date(dueDate);
    return compareAsc(endDate, today) < 0;
  }, [dueDate]);

  return (
    <div className="bg-muted p-2.5 mb-1.5 rounded shadow space-y-2 text-muted-foreground">
      <div className="flex item-start justify-between gap-x-2">
        <p className="line-clamp-2">{name}</p>
        <TaskActions task={task}>
          <MoreHorizontal className="size-4 stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition" />
        </TaskActions>
      </div>
      {description && <div className="line-clamp-3 text-xs">{description}</div>}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {tags.map((tag, index) => (
            <Badge key={task.$id + index}> {tag}</Badge>
          ))}
        </div>
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
        <span className={cn("text-xs", isOverDue && "text-destructive")}>
          {format(dueDate, "PP", {
            locale: getDateLocale(locale),
          })}
        </span>
      </div>
      <div className="flex items-center gap-x-1.5 justify-end">
        <Hint descrption={assignee.name} sideOffset={5}>
          <MemberAvatar
            name={assignee.name}
            className="size-6"
            fallbackClassName="text-[10px] text-muted-foreground"
          />
        </Hint>
      </div>
    </div>
  );
}
