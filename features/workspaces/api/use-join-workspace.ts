import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["workspaces"][":workspaceId"]["join"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["workspaces"][":workspaceId"]["join"]["$post"]
>;

export const useJoinWorkspace = () => {
  const tt = useTranslations("toast");
  const queryClient = useQueryClient();
  let loadingId: string | number = "";
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      loadingId = toast.loading(tt("loading.joining_workspace"));
      const response = await client["api"]["workspaces"][":workspaceId"][
        "join"
      ]["$post"]({
        json,
        param,
      });

      if (!response.ok) {
        const { error } = (await response.json()) as { error: string };
        throw new Error(error);
      }

      return await response.json();
    },
    onSuccess({ data: { $id, name } }) {
      toast.success(tt("success.join_workspace", { name }));
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", $id] });
    },
    onError: (error) => {
      const key = error.message as "already_member" | "invalid_invite_code";
      toast.error(tt(`error.${key}`));
    },
    onSettled() {
      toast.dismiss(loadingId);
    },
  });
  return mutation;
};
