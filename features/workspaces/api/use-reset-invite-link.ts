import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["workspaces"][":workspaceId"]["reset-invite-code"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["workspaces"][":workspaceId"]["reset-invite-code"]["$post"]
>;

export const useResetInviteLink = () => {
  const tt = useTranslations("toast");
  const queryClient = useQueryClient();
  let loadingId: string | number = "";
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      loadingId = toast.loading(tt("loading.resetting_invite_code"));
      const response = await client["api"]["workspaces"][":workspaceId"][
        "reset-invite-code"
      ]["$post"]({
        param,
      });

      if (!response.ok) {
        toast.dismiss(loadingId);
        toast.error(tt("error.invite_code_reset"));
        throw new Error(response.statusText);
      }

      return await response.json();
    },
    onSuccess({ data: { $id } }) {
      toast.success(tt("success.invite_code_reset"));
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", $id] });
    },
    onError: (error) => {
      toast.error(tt("error.invite_code_reset"));
    },
    onSettled() {
      toast.dismiss(loadingId);
    },
  });
  return mutation;
};
