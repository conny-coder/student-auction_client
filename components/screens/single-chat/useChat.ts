import { ChatService } from "@/services/chat.service";
import { useQuery } from "@tanstack/react-query";

export const useChat = (id: string) => {
  const {data, isLoading, refetch} = useQuery({queryKey: [`single-chat${id}`], queryFn: () => ChatService.getById(id), select: ({ data }) => data});

  return {data, isLoading, refetch};
}