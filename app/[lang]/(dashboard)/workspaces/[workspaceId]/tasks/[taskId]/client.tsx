"use client";
import { Loader2, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { InnerHeader, TBreadcrumbItem } from "@/components/system/inner-header";
import { TaskOverview } from "@/components/system/task-overview";
import { TaskOverviewSkeleton } from "@/components/system/task-overview/overview-skeleton";
import { TaskDescription } from "@/components/system/task-overview/task-description";
import { TaskDescriptionSkeleton } from "@/components/system/task-overview/task-description-skeleton";
import { TaskUpdateRecords } from "@/components/system/task-overview/task-update-records";
import { Button } from "@/components/ui/button";
import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useTaskId } from "@/hooks/use-task-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "@/i18n/routing";
import { TaskUpdateRecordsSkeleton } from "@/components/system/task-overview/task-update-records-skeleton";

export function TaskClient() {
  const t = useTranslations();
  const taskId = useTaskId();
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { data, isFetching } = useGetTask({ taskId });
  const { mutate: deleteTask, isPending } = useDeleteTask();
  const breadcrumbs: TBreadcrumbItem[] = useMemo(() => {
    return [
      {
        name: t("nav.tasks"),
        href: `/workspaces/${workspaceId}/tasks`,
      },
      {
        name: data?.name || <Loader2 className="size-4 animate-spin" />,
      },
    ];
  }, [t, data]);
  const handleDeleteTask = () => {
    deleteTask(
      { param: { taskId } },
      {
        onSuccess() {
          router.replace(`/workspaces/${workspaceId}/tasks`);
        },
      }
    );
  };
  // TODO add error page

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <InnerHeader breadcrumbs={breadcrumbs} />
        <Button
          variant="ghost"
          className="hover:text-destructive hover:border-destructive hover:bg-destructive/10 transition-colors"
          disabled={isPending}
          onClick={handleDeleteTask}
        >
          <Trash2 />
        </Button>
      </div>
      <DottedSeparator className="mb-2 lg:mb-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {isFetching || !data ? (
          <>
            <TaskOverviewSkeleton />
            <TaskDescriptionSkeleton />
            <TaskUpdateRecordsSkeleton />
          </>
        ) : (
          <>
            <TaskOverview task={data} />
            <TaskDescription task={data} />
            <TaskUpdateRecords updateRecords={data.updateRecords} />
          </>
        )}
      </div>
    </div>
  );
}
