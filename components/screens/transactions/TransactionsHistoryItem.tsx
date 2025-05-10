import CurrencyIcon from "@/components/icons/CurrencyIcon"
import WalletMinusIcon from "@/components/icons/WalletMinusIcon"
import WalletPlusIcon from "@/components/icons/WalletPlusIcon"
import StyledText from "@/components/ui/StyledText"
import { formatDateDDMMYYYY, formatTimeHHMM } from "@/utils/formated-time-ago"
import { FC } from "react"
import { View } from "react-native"

interface TransactionsHistoryItemProps {
  type: TransactionType
  amount: number
  createdAt: string
}

const typeOfTransaction = {
  deposit: "Поповнення",
  withdrawal: "Виведення",
  payout: "Оплата",
  payment: "Виплата"
} as const

type TransactionType = keyof typeof typeOfTransaction 

const TransactionsHistoryItem:FC<TransactionsHistoryItemProps> = ({type, amount, createdAt}) => {
  return (
  <>
    <View className="flex-row items-center gap-4 px-2">
      <View>
        {type === "deposit" || type === "payment" ? (
          <WalletPlusIcon />
        ): (
          <WalletMinusIcon />
        )}
      </View>
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-1">
          <StyledText className="font-openssemibold text-lg">{typeOfTransaction[type]}</StyledText>
          <StyledText className="font-openssemibold">{formatDateDDMMYYYY(createdAt)}</StyledText>
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-1">
            <StyledText className="text-lg">{amount}</StyledText>
            <CurrencyIcon />
          </View>

          <StyledText>{formatTimeHHMM(createdAt)}</StyledText>
        </View>
      </View>
    </View>
    <View className="w-full h-0.5 bg-gray-30p mt-4 mb-4" style={{ left: -15, right: -15, width: 400 }} />
  </>

  )
}
export default TransactionsHistoryItem