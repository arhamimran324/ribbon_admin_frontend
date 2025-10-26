// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";

// import { logout } from "@/api/service/auth";
// import { useAppDispatch } from "@/redux/hooks";
// import { logoutUser } from "@/redux/slices/auth-slice";

// export const useLogout = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const { mutate, isPending } = useMutation({
//     mutationFn: (vars: any) => logout(vars),
//     onSuccess: (result) => {
//       if (result?.status === true) {
//         console.log("Logout Success:", result);
//         toast.success(result?.error || "Logout Successful");

//         Cookies.remove("authToken", { path: "/" });
//         Cookies.remove("userId", { path: "/" });

//         dispatch(logoutUser());
//         router.push("/login");
//       } else {
//         console.log("Logout Failed:", result);
//         toast.error(result?.error || "Unexpected response format");
//       }
//     },
//     onError: (error: any) => {
//       console.error("Logout Error:", error);
//       const errorMessage =
//         error?.response?.data?.error || error?.message || "Logout failed";
//       toast.error(errorMessage);
//     },
//   });

//   return { mutate, isPending };
// };

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/slices/auth-slice";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logoutStatic = () => {
    // Remove auth info
    Cookies.remove("authToken", { path: "/" });
    Cookies.remove("userId", { path: "/" });

    // Clear user state
    dispatch(logoutUser());

    toast.success("Logout successful");

    // Redirect to login
    router.push("/login");
  };

  return { logoutStatic };
};
