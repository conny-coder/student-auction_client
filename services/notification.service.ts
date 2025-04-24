import { getNotificationsUrl } from "@/config/api.config";
import axios from "@/api/interceptors";
import { INotification } from "@/types/notification.types";

export const NotificationService = {
  async getAll(userId: string) {
    return axios.get<INotification[]>(getNotificationsUrl(`/${userId}`));
  },
  async changeRead(notificationId: string) {
    return axios.put<INotification>(getNotificationsUrl(`/read/${notificationId}`));
  },
  async getUnread() {
    return axios.get<number>(getNotificationsUrl(`/unread`));
  }
};
