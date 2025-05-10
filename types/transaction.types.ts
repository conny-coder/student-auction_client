export interface ITransaction {
  _id: string
  userId: string
  type: "deposit" | "payment" | "withdrawal" | "payout"
  amount: number
  createdAt: string
}

export interface ITransactionForm {
  amount: number
  type: "deposit" | "payment" | "withdrawal" | "payout"
  transactionToId?: string
  transactionById?: string
}