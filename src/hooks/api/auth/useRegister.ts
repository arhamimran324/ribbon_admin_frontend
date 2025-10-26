import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { register } from "@/api/service/auth";

export interface RegisterValues {
  full_name: string;
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export const useRegister = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (vars: RegisterValues) => register(vars),
    onSuccess: (result) => {
      if (result?.status === true) {
        toast.success(result?.message || "Register Successful");
        router.push("/login");
      } else {
        toast.error(result?.error || "Unexpected response format");
      }
    },
    onError: (error: any) => {
      console.error("signup Error:", error);

      // Extract error message safely
      const errorMessage =
        error?.response?.data?.error || error?.message || "signup failed";

      toast.error(errorMessage);
    },
  });

  return { mutate, isPending };
};
