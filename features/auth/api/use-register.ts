import { useRouter } from "@/i18n/routing";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client)["api"]["auth"]["register"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["auth"]["register"]["$post"]
>;

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const tt = useTranslations("toast");

  let loadingId: string | number = "";

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      loadingId = toast.loading(tt("loading.login"));
      const response = await client["api"]["auth"]["register"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess() {
      toast.success(tt("success.register"), {
        duration: 1500,
        onAutoClose() {
          router.refresh();
          queryClient.invalidateQueries({ queryKey: ["current"] });
        },
      });
    },
    onError(error) {
      toast.error(tt("error.register"));
    },
    onSettled() {
      toast.dismiss(loadingId);
    },
  });
  return mutation;
};
