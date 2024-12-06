import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["members"][":memberId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["members"][":memberId"]["$delete"]
>;

export const useDeleteMember = () => {
  const tt = useTranslations("toast");
  const queryClient = useQueryClient();
  let loadingId: string | number = "";
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      loadingId = toast.loading(tt("loading.deleting_member"));
      const response = await client["api"]["members"][":memberId"]["$delete"]({
        param,
      });

      if (!response.ok) {
        toast.dismiss(loadingId);
        toast.error(tt("error.workspace_updated"));
        throw new Error(response.statusText);
      }

      return await response.json();
    },
    onSuccess() {
      toast.success(tt("success.member_deleted"));
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      const key = error.message as "not_admin" | "not_member" | "remove_self";
      toast.error(tt(`error.${key}`));
    },
    onSettled() {
      toast.dismiss(loadingId);
    },
  });
  return mutation;
};
