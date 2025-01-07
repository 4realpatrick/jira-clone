import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["projects"][":projectId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["projects"][":projectId"]["$patch"]
>;

export const useUpdateProject = () => {
  const tt = useTranslations("toast");
  const queryClient = useQueryClient();
  let loadingId: string | number = "";

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      loadingId = toast.loading(tt("loading.updating_project"));

      const response = await client["api"]["projects"][":projectId"]["$patch"]({
        form,
        param,
      });

      if (!response.ok) {
        toast.dismiss(loadingId);
        toast.error(tt("error.project_updated"));
        throw new Error(response.statusText);
      }
      return await response.json();
    },
    onSuccess({ data: project }) {
      toast.success(tt("success.project_updated", { name: project.name }));
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", project.$id] });
    },
    onError: (error) => {
      console.log("error:", error);
      toast.error(tt("error.project_updated"));
    },
    onSettled() {
      toast.dismiss(loadingId);
    },
  });
  return mutation;
};
