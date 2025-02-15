import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["tasks"]["$post"],
  200
>;
type RequestType = InferRequestType<(typeof client)["api"]["tasks"]["$post"]>;

export const useCreateTask = () => {
  const tt = useTranslations("toast");
  const queryClient = useQueryClient();
  let loadingId: string | number = "";

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      loadingId = toast.loading(tt("loading.creating_task"));
      const response = await client["api"]["tasks"]["$post"]({
        json,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    },
    onSuccess({ data: project }) {
      toast.success(tt("success.task_created", { name: project.name }));
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(tt("error.task_created"));
    },
    onSettled() {
      toast.dismiss(loadingId);
    },
  });

  return mutation;
};
