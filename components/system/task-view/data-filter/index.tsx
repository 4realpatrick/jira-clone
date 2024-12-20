import { useTranslations } from "next-intl";
import { CircleHelp } from "lucide-react";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { MultiSelectFilter } from "@/components/common/multi-select";
import { DatePicker } from "@/components/common/date-picker";
import { Hint } from "@/components/common/hint";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useDataFilter } from "@/hooks/use-data-filter";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { ETaskStatus } from "@/interface/status";
import { StatusIcons } from "../../create-task-form";
import { AssigneeFilter } from "./assignee-filter";
import { Input } from "@/components/ui/input";

interface IDataFiltersProps {
  showProjectFilter?: boolean;
}

export function DataFilters({ showProjectFilter }: IDataFiltersProps) {
  const t = useTranslations();
  const workspaceId = useWorkspaceId();
  const selectedStatuses = useDataFilter((state) => state.statuses);
  const assigneeId = useDataFilter((state) => state.assigneeId);
  const dueDate = useDataFilter((state) => state.dueDate);
  const search = useDataFilter((state) => state.search);
  const setSearch = useDataFilter((state) => state.setSearch);
  const setStatuses = useDataFilter((state) => state.setStatuses);
  const setAssigneeId = useDataFilter((state) => state.setAssigneeId);
  const setDueDate = useDataFilter((state) => state.setDueDate);

  const { data: members, isFetching: isFetchingMembers } = useGetMembers({
    workspaceId,
  });

  const isLoading = isFetchingMembers;

  const memberOptions =
    members?.documents.map((project) => ({
      value: project.$id,
      label: project.name,
    })) || [];

  const statuses = Object.values(ETaskStatus).map((status) => ({
    value: status,
    label: t(`common.task_statuses.${status}`),
    icon: StatusIcons[status],
  }));

  const selectedMember = memberOptions.find(
    (member) => member.value === assigneeId
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
        <MultiSelectFilter<ETaskStatus>
          options={statuses}
          defaultValue={selectedStatuses}
          onSelectChange={setStatuses}
          title={t("common.task_status")}
          onlyChangeOnOpenChange
        />
        <AssigneeFilter
          selectedMember={selectedMember}
          title={t("common.task_assignee")}
          clearText={t("common.clear")}
          members={memberOptions}
          onAssigneeChange={handleAssigneeChange}
        />
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
