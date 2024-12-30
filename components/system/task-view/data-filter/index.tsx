import { useTranslations } from "next-intl";
import { CircleHelp } from "lucide-react";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { MultiSelectFilter } from "@/components/common/multi-select";
import { DatePicker } from "@/components/common/date-picker";
import { Hint } from "@/components/common/hint";
import { Input } from "@/components/ui/input";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useDataFilter } from "@/hooks/use-data-filter";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  EProjectTab,
  useSwitchProjectTaskview,
} from "@/hooks/use-switch-project-task-view";
import { ETaskStatus } from "@/interface/status";
import { StatusIcons } from "../../create-task-form";
import { AssigneeFilter } from "./assignee-filter";
import { ProjectFilter } from "./project-filter";

interface IDataFiltersProps {
  hideProjectFilter?: boolean;
}

export function DataFilters({ hideProjectFilter }: IDataFiltersProps) {
  const t = useTranslations();
  const workspaceId = useWorkspaceId();
  const selectedStatuses = useDataFilter((state) => state.statuses);
  const assigneeId = useDataFilter((state) => state.assigneeId);
  const dueDate = useDataFilter((state) => state.dueDate);
  const search = useDataFilter((state) => state.search);
  const projectId = useDataFilter((state) => state.projectId);
  const setSearch = useDataFilter((state) => state.setSearch);
  const setStatuses = useDataFilter((state) => state.setStatuses);
  const setAssigneeId = useDataFilter((state) => state.setAssigneeId);
  const setDueDate = useDataFilter((state) => state.setDueDate);
  const setProjectId = useDataFilter((state) => state.setProjectId);
  const { taskView } = useSwitchProjectTaskview();
  const { data: members, isFetching: isFetchingMembers } = useGetMembers({
    workspaceId,
  });
  const { data: projects, isFetching: isFetchingProjects } = useGetProjects({
    workspaceId,
  });

  const memberOptions =
    members?.documents.map((project) => ({
      value: project.$id,
      label: project.name,
    })) || [];
  const projectOptions =
    projects?.documents.map((project) => ({
      id: project.$id,
      label: project.name,
      imageUrl: project.imageUrl,
    })) || [];
  const statuses = Object.values(ETaskStatus).map((status) => ({
    value: status,
    label: t(`common.task_statuses.${status}`),
    icon: StatusIcons[status],
  }));

  const selectedMember = memberOptions.find(
    (member) => member.value === assigneeId
  );
  const selectedProject = projectOptions.find(
    (project) => project.id === projectId
  );
  const handleAssigneeChange = (value: string) => {
    setAssigneeId(value === "all" ? "" : value);
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center">
        <Input
          className="w-full lg:w-auto"
          defaultValue={search}
          onBlur={(e) => setSearch(e.target.value)}
        />
        {taskView !== EProjectTab.KANBAN && (
          <MultiSelectFilter<ETaskStatus>
            options={statuses}
            defaultValue={selectedStatuses}
            onSelectChange={setStatuses}
            title={t("common.task_status")}
            onlyChangeOnOpenChange
          />
        )}
        <AssigneeFilter
          selectedMember={selectedMember}
          title={t("common.task_assignee")}
          clearText={t("common.clear")}
          members={memberOptions}
          onAssigneeChange={handleAssigneeChange}
        />
        {!hideProjectFilter && (
          <ProjectFilter
            selectedProject={selectedProject}
            title={t("common.task_project")}
            clearText={t("common.clear")}
            projects={projectOptions}
            onProjectChange={setProjectId}
          />
        )}
        <DatePicker
          value={dueDate ? new Date(dueDate) : undefined}
          onDateChange={(date) => {
            setDueDate(date ? date.toISOString() : undefined);
          }}
        />
        <Hint
          descrption={t("common.task_due_date_pick_rule")}
          sideOffset={10}
          asChild
        >
          <CircleHelp className="size-4 hidden lg:inline cursor-pointer" />
        </Hint>
      </div>
      <DottedSeparator className="mt-2 md:mt-4" />
    </>
  );
}
