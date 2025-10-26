import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { CheckoutSession } from "@/api/service/dashboard";
import { useRouter } from "next/navigation";

export const useSetCheckoutSession = () => {
  const router = useRouter();
  // const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (vars: any) => CheckoutSession(vars),
    onSuccess: (result) => {
      toast.success(result?.message);
      router.push(result.url);
      // queryClient.invalidateQueries({ queryKey: ["all-users"] }); // refetch all users
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error || error?.message;
      toast.error(errorMessage);
    },
  });

  return { mutate, isPending };
};
