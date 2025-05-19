import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import io, { Socket } from "socket.io-client";
import StyledText from "@/components/ui/StyledText";
import { useAuth } from "@/hooks/useAuth";
import { IMessage } from "@/types/message.types";
import { API_SERVER_URL } from "@/config/api.config";
import { useChat } from "./useChat";
import { useUpload } from "@/hooks/useUpload";
import BtnSendIcon from "@/components/icons/BtnSendIcon";
import ChatImageIcon from "@/components/icons/ChatImageIcon";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/loaders/Loader";

const SingleChat: React.FC = () => {
  const { id: chatId } = useLocalSearchParams<{ id: string }>();
  const { data: chat, isLoading, refetch } = useChat(chatId);
  const user = useAuth();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");
  const [height, setHeight] = useState(0);
  const queryClient = useQueryClient();

  const socketRef = useRef<Socket>();

  const { uploadFile, isLoading: uploading } = useUpload((url: string) => {
    socketRef.current?.emit(
      "sendMessage",
      {
        chatId,
        senderId: user!._id,
        type: "file",
        fileUrl: url,
      },
      (saved: IMessage) => {
      }
    );
    refetch();
    queryClient.invalidateQueries({queryKey: ['all-chats']});
  });

  useEffect(() => {
    if (chat?.messages) {
      setMessages([...chat.messages]);
    }
  }, [chat]);

  useEffect(() => {
    const socket = io(API_SERVER_URL, { query: { chatId } });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinChat", chatId);
    });

    socket.on("newMessage", (msg: IMessage) => {
      setMessages(prev => [msg, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId]);

  const sendText = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    socketRef.current?.emit(
      "sendMessage",
      {
        chatId,
        senderId: user!._id,
        text: trimmed,
        type: "text",
      },
      () => {}
    );
    setText("");
    setHeight(0);
    refetch();
    queryClient.invalidateQueries({queryKey: ['all-chats']});
  };

  if (isLoading) return <Loader />;
  if (!chat) return <StyledText>Чат не знайдено</StyledText>;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-black"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        data={messages}
        inverted
        keyExtractor={(m: IMessage )=> m._id}
        className="px-2"
        renderItem={({ item }: { item: IMessage }) => {
          const isMine = item.senderId === user?._id;
          return (
            <View className={`my-1 flex-row ${isMine ? "justify-end" : "justify-start"}`}>
              {item.type === "text" ? (
                <View
                style={{ backgroundColor: isMine ? "rgba(197, 198, 199, 0.5)" : "#292B2D", maxWidth: 250 }}
                  className={`py-2 px-3 rounded-lg`}
                >
                  <StyledText >
                    {item.text}
                  </StyledText>
                </View>
              ) : (
                <Image
                  source={{ uri: API_SERVER_URL + item.fileUrl }}
                  style={{ width: 150, height: 150, borderRadius: 8 }}
                />
              )}

            </View>
          );
        }}
      />

      <View className="flex-row items-center p-2 border-t border-gray-700 bg-black mt-2">
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Повідомлення..."
          placeholderTextColor="#888"
          multiline
          onContentSizeChange={e =>
            setHeight( e.nativeEvent.contentSize.height )
          }
          className="flex-1 px-3 border border-gray-600 rounded-2xl text-white pr-28"
          style={{
            height: Math.max( 40, height ),       
            textAlignVertical: "top",          
          }}
        />

        <Pressable
          onPress={() => uploadFile()}
          disabled={uploading}
          className="absolute right-20"
        >
          <ChatImageIcon />
        </Pressable>

        <Pressable
          onPress={sendText}
          className="absolute right-6"
        >
          <BtnSendIcon />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SingleChat;
