import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useTranslations } from "next-intl";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client)["api"]["tasks"]["bulk-update"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client)["api"]["tasks"]["bulk-update"]["$post"]
>;

export const useBulkUpdateTask = () => {
  const tt = useTranslations("toast");
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client["api"]["tasks"]["bulk-update"]["$post"]({
        json,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.log("error:", error);
    },
  });

  return mutation;
};
