import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { ChatService } from '@/services/chat.service';
import { IChat } from '@/types/chat.types';
import { errorCatch } from '@/api/api.helpers';
import Toast from "react-native-toast-message";

export const useCreateChat = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<IChat, Error, string>({
    mutationKey: ['create chat'],
    mutationFn: (userId) => ChatService.create(userId).then(res => res.data),
    onSuccess: (chat: any) => {
      router.push(`/chat/${chat._id}`);

      queryClient.invalidateQueries({queryKey: ['all-chats']});
    },
    onError: (err) => {
      Toast.show({
        type: 'error',
        text1: 'Створення чату',
        text2: errorCatch(err),
      })

      console.error('Error creating chat', err);
    },
  });
};
