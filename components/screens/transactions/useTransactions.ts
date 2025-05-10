import { errorCatch } from "@/api/api.helpers";
import { TransactionService } from "@/services/transaction.service";
import { ITransactionForm } from "@/types/transaction.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useTransactions = () => {
  const queryClient = useQueryClient();

  const {mutate: mutateWithdrawal} = useMutation({
    mutationKey: ['transactions-withdrawal'],
    mutationFn: (data: ITransactionForm) => TransactionService.create(data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Виведення коштів',
        text2: 'Успішно відправлено',
      })

      queryClient.invalidateQueries({queryKey: ['my balance']});
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Виведення коштів',
        text2: errorCatch(error),
      })
    }
  })

  const {mutate: mutateDeposit} = useMutation({
    mutationKey: ['transactions-deposit'],
    mutationFn: (data: ITransactionForm) => TransactionService.create(data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Депозит',
        text2: 'Успішно поповнено',
      })

      queryClient.invalidateQueries({queryKey: ['my balance']});
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Депозит',
        text2: errorCatch(error),
      })
    }
  })

  return {mutateWithdrawal, mutateDeposit}
};