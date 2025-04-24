import LogoutIcon from "@/components/icons/LogoutIcon"
import PasswordIcon from "@/components/icons/PasswordIcon"
import ProfileIcon from "@/components/icons/ProfileIcon"
import TransactionIcon from "@/components/icons/TransactionIcon"
import { useAuthStore } from "@/store/useAuthStore"
import { router } from "expo-router"
import {  View } from "react-native"
import SettingsItem from "./SettingsItem"

const Settings = () => {
  const {logout} = useAuthStore()

  return (
    <View>
      <SettingsItem title="Змінити особисті дані" onPress={() => {router.push("/change-profile")}} Icon={ProfileIcon} />
      <SettingsItem title="Змінити пароль" onPress={() => {router.push("/change-password")}} Icon={PasswordIcon} />
      <SettingsItem title="Транзакції" onPress={() => {router.push("/transactions")}} Icon={TransactionIcon} />
      <SettingsItem title="Вийти з аккаунту" onPress={logout} Icon={LogoutIcon} />
    </View>
  )
}
export default Settings