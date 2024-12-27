import { ETaskStatus } from "@/interface/status";
import { TPopulatedTask } from "@/interface/task";
import { cn } from "@/lib/utils";
import { Hint } from "@/components/common/hint";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "@/i18n/routing";
import { MemberAvatar } from "../../member-list/avatar";

interface IEventCardProps {
  title: string;
  assignee: TPopulatedTask["assignee"];
  status: ETaskStatus;
  id: string;
}

const statusColorMap: Record<ETaskStatus, string> = {
  [ETaskStatus.BACKLOG]: "border-l-muted",
  [ETaskStatus.TODO]: "border-l-muted",
  [ETaskStatus.IN_PROGRESS]: "border-l-primary",
  [ETaskStatus.IN_REVIEW]: "border-l-yellow-500",
  [ETaskStatus.DONE]: "border-l-green-500",
};
export function EventCard({ title, status, assignee, id }: IEventCardProps) {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };
  return (
    <div className="px-2">
      <div
        className={cn(
          "p-1.5 text-xs bg-background text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
          statusColorMap[status]
        )}
        onClick={handleClick}
      >
        <p>{title}</p>
        <div className="flex items-center gap-x-1">
          <Hint descrption={assignee?.name} sideOffset={5}>
            <MemberAvatar name={assignee?.name} className="size-6" />
          </Hint>
        </div>
      </div>
    </div>
  );
}
