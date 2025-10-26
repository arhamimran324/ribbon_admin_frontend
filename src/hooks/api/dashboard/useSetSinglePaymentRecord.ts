// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";

// import { CheckSinglePaymentRecord } from "@/api/service/dashboard";

// export const useSetSinglePaymentRecord = () => {
//   const { mutate, isPending, data } = useMutation({
//     mutationFn: (vars: any) => CheckSinglePaymentRecord(vars),
//     onSuccess: (result) => {
//       toast.success(result?.message);
//     },
//     onError: (error: any) => {
//       const errorMessage = error?.response?.data?.error || error?.message;
//       toast.error(errorMessage);
//     },
//   });

//   return { mutate, isPending, data };
// };
