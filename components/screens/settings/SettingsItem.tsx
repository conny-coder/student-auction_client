import SettingsArrowIcon from "@/components/icons/SettingsArrowIcon"
import StyledText from "@/components/ui/StyledText"
import { FC } from "react"
import { Pressable, View } from "react-native"
import { SvgProps } from "react-native-svg"

interface SettingsItemProps {
  title: string
  onPress: () => void
  Icon: React.ComponentType<SvgProps>;
}

const SettingsItem:FC<SettingsItemProps> = ({title, onPress, Icon}) => {
  return (
    <>
      <Pressable onPress={onPress} className="flex-row items-center justify-between px-4 py-5">
        <View className="flex-row items-center gap-6">
          <Icon />
          <StyledText className="font-opensmedium text-lg" style={{ lineHeight: 20 }}>{title}</StyledText>
        </View>
        <SettingsArrowIcon />
      </Pressable>
      <View className="h-0.5 bg-gray-30p mb-2 relative" style={{ left: -15, right: -15, width: 400 }} />
    </>
  )
}
export default SettingsItem