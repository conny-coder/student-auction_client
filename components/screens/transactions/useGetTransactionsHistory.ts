import { useAuth } from "@/hooks/useAuth";
import { TransactionService } from "@/services/transaction.service";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionsHistory = () => {
  const user = useAuth()

  const {data, isLoading, refetch} = useQuery({
    queryKey: ["transactions-history"],
    queryFn: () => TransactionService.getAll(user?._id || ""),
    select: ({ data }) => data,
    enabled: !!user
  })

  return {data, isLoading, refetch};
};