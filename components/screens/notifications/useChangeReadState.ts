import { NotificationService } from "@/services/notification.service";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

export const useChangeReadState = () => {
  const queryClient = useQueryClient();

  const {mutate: changeRead} = useMutation({
    mutationKey: ['change read state'],
    mutationFn: ({ notificationId }: { notificationId: string }) => NotificationService.changeRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['notifications']});
      queryClient.invalidateQueries({queryKey: ['unread-notifications']});
    },
  })

  return changeRead
};