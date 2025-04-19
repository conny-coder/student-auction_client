import StyledText from "@/components/ui/StyledText"
import { API_SERVER_URL } from "@/config/api.config"
import { router } from "expo-router"
import { FC } from "react"
import { Alert, Image, Pressable, View } from "react-native"

interface ChatItemProps {
  avatar: string
  name: string
  message: string
  id: string
}

const ChatItem:FC<ChatItemProps> = ({avatar,message,name, id}) => {
  return (
    <Pressable className="flex-row items-center gap-3 mb-8" onPress={() => {router.push(`/chat/${id}`)}}>
      <Image source={{ uri: `${API_SERVER_URL}${avatar}` }} className="w-16 h-16 rounded-full" />
      <View>
        <StyledText className="text-lg">{name}</StyledText>
        <StyledText numberOfLines={1} ellipsizeMode="tail" style={{ color: "rgba(197, 198, 199, 0.7)", maxWidth: 300 }} className="overflow-hidden whitespace-nowrap text-ellipsis">{message}</StyledText>
      </View>
    </Pressable>
  )
}
export default ChatItem