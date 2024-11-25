import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client)["api"]["auth"]["logout"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["auth"]["logout"]["$post"]
>;

export const useLogout = () => {
  const queryClient = useQueryClient();
  const tt = useTranslations("toast");

  let loadingId: string | number = "";

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      loadingId = toast.loading(tt("loading.logout"));
      const response = await client["api"]["auth"]["logout"]["$post"]();
      return await response.json();
    },
    onSuccess() {
      toast.success(tt("success.logout"), {
        duration: 1500,
        onAutoClose() {
          window.location.reload();
          queryClient.invalidateQueries({ queryKey: ["current"] });
        },
      });
    },
    onError() {
      toast.error(tt("error.logout"));
    },
    onSettled() {
      toast.dismiss(loadingId);
    },
  });
  return mutation;
};
