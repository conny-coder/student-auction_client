import { ChatService } from "@/services/chat.service";
import { useQuery } from "@tanstack/react-query";

export const useChats = () => {
  const {data, isLoading, refetch} = useQuery({queryKey: ["all-chats"], queryFn: () => ChatService.getAll(), select: ({ data }) => data,staleTime: 0,
  refetchOnMount: 'always',  
  refetchOnWindowFocus: true, });

  return {data, isLoading, refetch};
}