/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { loginUser, setUser } from "@/redux/slices/auth-slice";
import { LoginRequest } from "@/api/api-types";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/api/service/auth";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (vars: LoginRequest) => login(vars),

    onSuccess: (result) => {
      if (result?.status === true) {
        console.log("Login Success:", result);

        // Check if user has admin role
        const userRole = result.user?.role || result.role;
        if (userRole !== "admin") {
          toast.error("Access denied. Admin privileges required.");
          console.warn("Non-admin user attempted login:", userRole);
          return; // Stop execution here
        }

        toast.success(result?.error || "Login Successful");

        // Store token and user ID in cookies
        Cookies.set("authToken", result.token || result.email, {
          expires: 7,
          path: "/",
        });
        Cookies.set("userId", result.user.id.toString(), {
          expires: 7,
          path: "/",
        });

        // Store role in cookie for client-side checks
        Cookies.set("userRole", userRole, {
          expires: 7,
          path: "/",
        });

        // Extract user details from response
        const userDetails = {
          id: result?.user?.id,
          name: result?.name,
          email: result?.email,
          token: result?.token,
          role: userRole, // Make sure role is included in user details
        };

        // Update Redux state
        dispatch(loginUser());
        dispatch(setUser(userDetails));

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        console.log("Login Failed:", result);
        toast.error(result?.error || "Unexpected response format");
      }
    },

    onError: (error: any) => {
      console.error("Login Error:", error);
      const errorMessage =
        error?.response?.data?.message || error?.message || "Login failed";
      toast.error(errorMessage);
    },
  });

  return { mutate, isPending };
};
