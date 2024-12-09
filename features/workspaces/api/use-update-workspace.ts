import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { useRouter } from "@/i18n/routing";

type ResponseType = InferResponseType<
  (typeof client)["api"]["workspaces"][":workspaceId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["workspaces"][":workspaceId"]["$patch"]
>;

export const useUpdateWorkspace = () => {
  const tt = useTranslations("toast");
  const queryClient = useQueryClient();
  const router = useRouter();
  let loadingId: string | number = "";
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      loadingId = toast.loading(tt("loading.updating_workspace"));

      const response = await client["api"]["workspaces"][":workspaceId"][
        "$patch"
      ]({
        form,
        param,
      });

      if (!response.ok) {
        toast.dismiss(loadingId);
        toast.error(tt("error.workspace_updated"));
        throw new Error(response.statusText);
      }
      return await response.json();
    },
    onSuccess({ data: workspace }) {
      toast.success(tt("success.workspace_updated", { name: workspace.name }));
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", workspace.$id] });
    },
    onError: (error) => {
      console.log("error:", error);
      toast.error(tt("error.workspace_updated"));
    },
    onSettled() {
      toast.dismiss(loadingId);
    },
  });
  return mutation;
};
