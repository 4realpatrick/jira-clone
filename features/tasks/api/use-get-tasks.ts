import { useQuery } from "@tanstack/react-query";
import { ETaskStatus } from "@/interface/status";
import { client } from "@/lib/rpc";

interface IUsetGetProjectsProps {
  workspaceId: string;
  projectId?: string | null;
  statuses?: ETaskStatus[] | null;
  assigneeId?: string | null;
  dueDate?: string | null;
  search?: string | null;
}

export const useGetTasks = (props: IUsetGetProjectsProps) => {
  const { workspaceId, projectId, statuses, search, assigneeId, dueDate } =
    props;
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      statuses,
      search,
      assigneeId,
      dueDate,
    ],
    queryFn: async () => {
      const res = await client["api"]["tasks"].$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          statuses: statuses ?? [],
          search: search ?? undefined,
          assigneeId: assigneeId ?? undefined,
          dueDate: dueDate ?? undefined,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
