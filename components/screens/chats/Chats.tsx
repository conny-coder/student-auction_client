import Loader from "@/components/loaders/Loader";
import StyledText from "@/components/ui/StyledText"
import { ScrollView, View } from "react-native"
import ChatItem from "./ChatItem";
import { useChats } from "./useChats"

const Chats = () => {
  const {data, isLoading} = useChats();

  if(isLoading) return <Loader />
  if(!data) return <StyledText>Chats not found</StyledText>;
  
  return (
    <ScrollView className="bg-black pt-5 px-4">
      <View>
        {data.map(chat => <ChatItem key={chat.chatId} id={chat.chatId} avatar={chat.otherUser.avatar} name={chat.otherUser.name} message={chat.lastMessage ? chat.lastMessage.type === "text" ? chat.lastMessage.text || "" : "Надіслано фото" : "Напишіть перше повідомлення"} />)}
      </View>
    </ScrollView>
  )
}
export default Chats