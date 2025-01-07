import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const res = await client["api"]["workspaces"].$get();

      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
