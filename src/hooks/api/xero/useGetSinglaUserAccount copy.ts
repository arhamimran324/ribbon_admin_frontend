import { singleUserAccount } from "@/api/service/xero-services";
import { useQuery } from "@tanstack/react-query";

export const useGetSinglaUserAccount = (vars: any) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["singal-user-account", vars],
    queryFn: () => singleUserAccount(vars),
    enabled: !!vars,
  });
  return { data, isLoading, isError };
};
