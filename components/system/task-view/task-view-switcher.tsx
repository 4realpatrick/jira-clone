"use client";

import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { Plus } from "lucide-react";
import { LineTabs } from "@/components/syntax/tabs/line-tabs";
import { Button } from "@/components/ui/button";
import { TextRevealButton } from "@/components/syntax/button/text-reveal";
import { DottedSeparator } from "@/components/common/dotted-separator";
import {
  EProjectTab,
  useSwitchProjectTaskview,
} from "@/hooks/use-switch-project-task-view";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useDataFilter } from "@/hooks/use-data-filter";
import { useCreateTaskModal } from "@/hooks/use-create-task-modal";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useBulkUpdateTask } from "@/features/tasks/api/use-bulk-update-tasks";
import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import { DataFilters } from "./data-filter";
import { DataTable } from "./table/data-table";
import { useColumns } from "./table/use-column";
import { Kanban, TUpdatesPayload } from "./kanban";
import { DataCalendar } from "./calendar";

const TaskViews = [
  {
    key: "table",
    value: EProjectTab.TABLE,
    content: "table",
  },
  {
    key: "kanban",
    value: EProjectTab.KANBAN,
    content: "kanban",
  },
  {
    key: "calendar",
    value: EProjectTab.CALENDAR,
    content: "calendar",
  },
] as const;

export function TaskTabSwitcher({
  initialValue = {},
  hideProjectFilter = false,
}: {
  initialValue?: Partial<Parameters<typeof useGetTasks>[0]>;
  hideProjectFilter?: boolean;
}) {
  const t = useTranslations();
  const isMobile = useIsMobile();
  const workspaceId = useWorkspaceId();
  const statuses = useDataFilter((state) => state.statuses);
  const assigneeId = useDataFilter((state) => state.assigneeId);
  const projectId = useDataFilter((state) => state.projectId);
  const dueDate = useDataFilter((state) => state.dueDate);
  const search = useDataFilter((state) => state.search);
  const columns = useColumns();
  const { taskView, setTaskView } = useSwitchProjectTaskview();
  const setStatuses = useDataFilter((state) => state.setStatuses);
  const { open } = useCreateTaskModal();
  const { mutate: bulkUpdateTask } = useBulkUpdateTask();
  const { mutate: deleteTask } = useDeleteTask(false);
  const { data, isFetching, isPending } = useGetTasks({
    workspaceId,
    statuses,
    assigneeId,
    dueDate,
    projectId,
    // search,
  });
  const translatedTaskViews = useMemo(
    () =>
      TaskViews.map((view) => ({
        ...view,
        label: t(`pages.projects.detail.${view.key}`),
      })),
    []
  );

  const handleKanbanChange = useCallback(
    (tasks: TUpdatesPayload[]) => {
      bulkUpdateTask({ json: { tasks } });
    },
    [bulkUpdateTask]
  );
  const handleDeleteTask = useCallback(
    (taskId: string) => {
      deleteTask({ param: { taskId } });
    },
    [deleteTask]
  );
  const handleTaskViewChange = useCallback(
    (view: EProjectTab) => {
      if (view === EProjectTab.KANBAN) {
        setStatuses([]);
      }
      setTaskView(view);
    },
    [setTaskView]
  );
  return (
    <div className="space-y-2 flex-1 flex flex-col">
      <div className="flex items-center gap-x-4 flex-wrap gap-y-2 flex-col md:flex-row">
        <LineTabs<EProjectTab>
          tabs={translatedTaskViews}
          selectedTab={taskView}
          onTabChange={handleTaskViewChange}
          fullWidth={isMobile}
        />
        {isMobile ? (
          <>
            <Button size="sm" className="h-7 w-full" onClick={() => open()}>
              <Plus />
              {t("pages.projects.detail.new")}
            </Button>
            <DottedSeparator />
          </>
        ) : (
          <div className="sticky right-2">
            <TextRevealButton
              icon={<Plus className="size-4" />}
              onClick={() => open()}
            >
              {t("pages.projects.detail.new")}
            </TextRevealButton>
          </div>
        )}
      </div>
      <DataFilters hideProjectFilter={hideProjectFilter} />
      {taskView === EProjectTab.TABLE && (
        <DataTable
          data={data?.documents || []}
          columns={columns}
          isLoiadng={isFetching}
        />
      )}
      {taskView === EProjectTab.KANBAN && (
        <Kanban
          data={data?.documents || []}
          onChange={handleKanbanChange}
          onDelete={handleDeleteTask}
          isPending={isPending}
        />
      )}
      {taskView === EProjectTab.CALENDAR && (
        <DataCalendar data={data?.documents || []} isPending={isPending} />
      )}
    </div>
  );
}
