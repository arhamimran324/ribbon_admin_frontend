import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { createUserAccount } from "@/api/service/xero-services";

export const useSetAccount = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (vars: any) => createUserAccount(vars),
    onSuccess: (result) => {
      toast.success(result?.message || "Account Successfully Created");
      // router.push(result.url);
      queryClient.invalidateQueries({ queryKey: ["all-accounts"] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error || error?.message;
      toast.error(errorMessage);
    },
  });

  return { mutate, isPending };
};
