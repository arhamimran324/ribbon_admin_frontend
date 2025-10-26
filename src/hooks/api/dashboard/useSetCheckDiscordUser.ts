import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { CheckDiscordUser } from "@/api/service/dashboard";
import { useRouter } from "next/navigation";

type UseSetVerifyOTPProps = {
  onSuccess?: (result: any) => void;
};
export const useSetCheckDiscordUser = ({
  onSuccess,
}: UseSetVerifyOTPProps = {}) => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (vars: any) => CheckDiscordUser(vars),
    onSuccess: (result) => {
      toast.success(result?.message);
      if (result?.status === true) {
        if (onSuccess) onSuccess(result);

        if (result?.url && typeof result.url === "string") {
          router.push(result.url);
        }
      }
    },

    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error || error?.message;
      toast.error(errorMessage);
    },
  });

  return { mutate, isPending };
};
