import { Button } from "@/components/ui/button";
import { StatusIcons } from "../../create-task-form";
import { ETaskStatus } from "@/interface/status";
import { Plus } from "lucide-react";
import { useCreateTaskModal } from "@/hooks/use-create-task-modal";

export function KanbanHeader({
  column,
  title,
  taskCount,
}: {
  column: ETaskStatus;
  title: string;
  taskCount: number;
}) {
  const { open } = useCreateTaskModal();
  return (
    <div className="px-2 py-1.5 flex items-center justify-between border-b">
      <div className="flex items-center gap-x-1.5">
        {StatusIcons[column]}
        <h2 className="text-sm font-medium">{title}</h2>
        <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium">
          {taskCount}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="size-5"
        onClick={() => open({ status: column })}
      >
        <Plus />
      </Button>
    </div>
  );
}
