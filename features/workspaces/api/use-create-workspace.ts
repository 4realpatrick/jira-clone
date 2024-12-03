import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["workspaces"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["workspaces"]["$post"]
>;

export const useCreateWorkspace = () => {
  const tt = useTranslations("toast");
  const queryClient = useQueryClient();
  let loadingId: string | number = "";
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      loadingId = toast.loading(tt("loading.creating_workspace"));
      const response = await client["api"]["workspaces"]["$post"]({
        form,
      });
      return await response.json();
    },
    onSuccess({ data: workspace }) {
      toast.success(tt("success.workspace_created", { name: workspace.name }));
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: (error) => {
      toast.error(tt("error.workspace_created"));
    },
    onSettled() {
      toast.dismiss(loadingId);
    },
  });
  return mutation;
};
