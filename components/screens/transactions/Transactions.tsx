import { View } from "react-native"
import SettingsItem from "../settings/SettingsItem"
import { router } from "expo-router"
import HistoryIcon from "@/components/icons/HistoryIcon"
import WalletIcon from "@/components/icons/WalletIcon"

const Transactions = () => {
  return (
    <View>
      <SettingsItem title="Історія транзакцій" onPress={() => {router.push("/transactions/history")}} Icon={HistoryIcon} />
      <SettingsItem title="Операції з коштами" onPress={() => {router.push("/transactions/operations")}} Icon={WalletIcon} />
    </View>
  )
}
export default Transactions