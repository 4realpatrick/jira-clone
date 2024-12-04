import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["workspaces"][":workspaceId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["workspaces"][":workspaceId"]["$delete"]
>;

export const useDeleteWorkspace = () => {
  const tt = useTranslations("toast");
  const queryClient = useQueryClient();
  let loadingId: string | number = "";
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      loadingId = toast.loading(tt("loading.deleting_workspace"));
      const response = await client["api"]["workspaces"][":workspaceId"][
        "$delete"
      ]({
        param,
      });

      if (!response.ok) {
        toast.dismiss(loadingId);
        toast.error(tt("error.workspace_updated"));
        throw new Error(response.statusText);
      }

      return await response.json();
    },
    onSuccess({ data: { $id } }) {
      toast.success(tt("success.workspace_deleted"));
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", $id] });
    },
    onError: (error) => {
      toast.error(tt("error.workspace_deleted"));
    },
    onSettled() {
      toast.dismiss(loadingId);
    },
  });
  return mutation;
};
