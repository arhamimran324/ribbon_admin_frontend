import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { resetPassword } from "@/api/service/auth";

export const useResetPassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (vars: any) => resetPassword(vars),
    onSuccess: (result) => {
      toast.success(result?.message);
    },
    onError: (error: any) => {
      console.error("signup Error:", error);
      const errorMessage =
        error?.response?.data?.error || error?.message || "signup failed";
      toast.error(errorMessage);
    },
  });

  return { mutate, isPending };
};
