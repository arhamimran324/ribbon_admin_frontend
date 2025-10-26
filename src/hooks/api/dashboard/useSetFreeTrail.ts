// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";

// import { FreeTrail } from "@/api/service/dashboard";

// export const useSetFreeTrail = (onSuccess?: (result: any) => void) => {
//   const { mutate, isPending } = useMutation({
//     mutationFn: (vars: any) => FreeTrail(vars),
//     onSuccess: (result) => {
//       toast.success(result?.message);
//       if (result?.status === true) {
//         if (onSuccess) onSuccess(result);
//       }
//     },

//     onError: (error: any) => {
//       const errorMessage = error?.response?.data?.error || error?.message;
//       toast.error(errorMessage);
//     },
//   });

//   return { mutate, isPending };
// };
