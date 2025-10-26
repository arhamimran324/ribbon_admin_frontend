import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { singleUserAccountDelete } from "@/api/service/xero-services";

export const useGetSinglaUserAccountDelete = (
  onSuccessCallback?: () => void,
) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => singleUserAccountDelete(id),
    onSuccess: (res) => {
      toast.success(res?.message || "Account Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["all-accounts"] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to delete account");
    },
  });

  return { mutate, isPending };
};
