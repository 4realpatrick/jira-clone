import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["tasks"][":taskId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["tasks"][":taskId"]["$delete"]
>;

export const useDeleteTask = (showToast: boolean = true) => {
  const tt = useTranslations("toast");
  const queryClient = useQueryClient();
  let loadingId: string | number = "";

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      if (showToast) {
        loadingId = toast.loading(tt("loading.deleting_task"));
      }
      const response = await client["api"]["tasks"][":taskId"]["$delete"]({
        param,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    },
    onSuccess({ data }) {
      if (showToast) {
        toast.success(tt("success.task_deleted"));
      }
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
    },
    onError: (error) => {
      toast.error(tt("error.task_deleted"));
    },
    onSettled() {
      if (showToast) {
        toast.dismiss(loadingId);
      }
    },
  });

  return mutation;
};
