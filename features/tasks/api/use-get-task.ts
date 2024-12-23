import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface IUsetGetProjectsProps {
  taskId: string;
}

export const useGetTask = ({ taskId }: IUsetGetProjectsProps) => {
  const query = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const res = await client["api"]["tasks"][":taskId"].$get({
        param: {
          taskId,
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
