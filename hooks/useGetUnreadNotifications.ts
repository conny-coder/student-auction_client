import { NotificationService } from "@/services/notification.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUnreadNotifications = () => {
  const {data} = useQuery({
    queryKey: ["unread-notifications"],
    queryFn: () => NotificationService.getUnread(),
    select: ({ data }) => data,

  })

  return data || 0
};