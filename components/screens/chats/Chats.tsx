import Loader from "@/components/loaders/Loader";
import StyledText from "@/components/ui/StyledText"
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native"
import ChatItem from "./ChatItem";
import { useChats } from "./useChats"

const Chats = () => {
  const {data, isLoading, refetch} = useChats();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if(isLoading) return <Loader />
  if(!data?.length) return <StyledText color="text-gray-70p" className="top-2 left-4 text-xl">Чатів немає</StyledText>;
  
  return (
    <ScrollView className="bg-black pt-5 px-4" refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>
      {!data?.length ? <StyledText color="text-gray-70p" className="top-2 left-4 text-xl">Чатів немає</StyledText> : (
        <View>
          {data.map( chat => <ChatItem
            key={chat.chatId}
            id={chat.chatId}
            avatar={chat.otherUser?.avatar || ""}
            name={chat.otherUser?.name || ""}
            message={chat.lastMessage
              ? chat.lastMessage.type === "text"
                ? chat.lastMessage.text
                || "" : "Надіслано фото" : "Напишіть перше повідомлення"}
          /> )}
        </View>
      )}

    </ScrollView>
  )
}
export default Chats