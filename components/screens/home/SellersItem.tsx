import StyledText from "@/components/ui/StyledText"
import { API_SERVER_URL } from "@/config/api.config"
import { router } from "expo-router"
import { FC } from "react"
import { Image, Pressable, View } from "react-native"

interface SellersItemProps {
  _id: string
  name: string
  avatar: string
}

const SellersItem:FC<SellersItemProps> = ({_id, name, avatar}) => {
  return (
    <Pressable className="flex-col items-center" onPress={() => router.push(`/user/${_id}`)}>
      <Image source={{uri: API_SERVER_URL + avatar}} width={150} height={150} className="rounded-full mb-2" />
      <StyledText className="text-center font-openssemibold">{name}</StyledText>
    </Pressable>
  )
}
export default SellersItem