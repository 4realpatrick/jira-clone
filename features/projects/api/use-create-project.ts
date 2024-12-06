import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["projects"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["projects"]["$post"]
>;

export const useCreateProject = () => {
  const tt = useTranslations("toast");
  const queryClient = useQueryClient();
  let loadingId: string | number = "";

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      loadingId = toast.loading(tt("loading.creating_project"));
      const response = await client["api"]["projects"]["$post"]({
        form,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    },
    onSuccess({ data: project }) {
      toast.success(tt("success.project_created", { name: project.name }));
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      toast.error(tt("error.project_created"));
    },
    onSettled() {
      toast.dismiss(loadingId);
    },
  });

  return mutation;
};
