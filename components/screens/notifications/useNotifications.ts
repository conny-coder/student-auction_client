import { useAuth } from "@/hooks/useAuth";
import { NotificationService } from "@/services/notification.service";
import { useQuery } from "@tanstack/react-query";

export const useNotifications = () => {
  const user = useAuth()

  const {data, isLoading} = useQuery({
    queryKey: ["notifications"],
    queryFn: () => NotificationService.getAll(user?._id || ""),
    select: ({ data }) => data,
    enabled: !!user
  })

  return {data, isLoading};
};