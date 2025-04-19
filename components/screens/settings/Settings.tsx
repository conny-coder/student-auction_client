import LogoutIcon from "@/components/icons/LogoutIcon"
import { useAuthStore } from "@/store/useAuthStore"
import {  View } from "react-native"
import SettingsItem from "./SettingsItem"

const Settings = () => {
  const {logout} = useAuthStore()

  return (
    <View>
      <SettingsItem title="Вийти з аккаунту" onPress={logout} Icon={LogoutIcon} />
    </View>
  )
}
export default Settings