import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { useRouter } from "@/i18n/routing";

type ResponseType = InferResponseType<
  (typeof client)["api"]["tasks"][":taskId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["tasks"][":taskId"]["$patch"]
>;

export const useUpdateTask = () => {
  const tt = useTranslations("toast");
  const router = useRouter();
  const queryClient = useQueryClient();
  let loadingId: string | number = "";

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      loadingId = toast.loading(tt("loading.updating_task"));
      const response = await client["api"]["tasks"][":taskId"]["$patch"]({
        param,
        json,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    },
    onSuccess({ data: task }) {
      toast.success(tt("success.task_updated", { name: task.name }));
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", task.$id] });
    },
    onError: (error) => {
      toast.error(tt("error.task_updated"));
    },
    onSettled() {
      toast.dismiss(loadingId);
    },
  });

  return mutation;
};
