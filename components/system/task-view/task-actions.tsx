import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TTask } from "@/interface/task";
import { useTranslations } from "next-intl";
import { Eye, Pencil, Share2, Trash2 } from "lucide-react";
import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";

export function TaskActions({
  children,
  task,
}: {
  children: ReactNode;
  task: TTask;
}) {
  const { workspaceId, $id: taskId } = task;
  const t = useTranslations();

  const router = useRouter();

  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();

  const detailLink = `/workspaces/${workspaceId}/tasks/${taskId}`;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {t("pages.tasks.table.actions.label")}
        </DropdownMenuLabel>
        <DropdownMenuItem
          className="flex items-center gap-2"
          disabled={isDeletingTask}
          onClick={() => router.push(detailLink)}
        >
          <Eye />
          {t("pages.tasks.table.actions.view")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          disabled={isDeletingTask}
        >
          <Pencil />
          {t("pages.tasks.table.actions.edit")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          disabled={isDeletingTask}
          onClick={() => {
            navigator.clipboard.writeText(`${location.origin}detailLink`);
            toast.success(t("common.copy_success"));
          }}
        >
          <Share2 />
          {t("pages.tasks.table.actions.share")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 text-destructive"
          disabled={isDeletingTask}
          onClick={() => deleteTask({ param: { taskId: taskId } })}
        >
          <Trash2 />
          {t("pages.tasks.table.actions.delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
