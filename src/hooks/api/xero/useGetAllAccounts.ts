import { getAllAccount } from "@/api/service/xero-services";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAccounts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-accounts"],
    queryFn: () => getAllAccount(),
  });
  return { data, isLoading, isError };
};
