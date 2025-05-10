import { getNotificationsUrl, getTransactionsUrl } from "@/config/api.config";
import axios from "@/api/interceptors";
import { ITransaction, ITransactionForm } from "@/types/transaction.types";

export const TransactionService = {
  async create(data: ITransactionForm) {
    return axios.post<ITransaction>(getTransactionsUrl(""), data);
  },
  async getAll(userId: string) {
    return axios.get<ITransaction[]>(getTransactionsUrl(`/user/${userId}`));
  }
};
