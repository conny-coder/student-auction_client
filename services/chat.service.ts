import { getChatsUrl } from "@/config/api.config";
import axios from "@/api/interceptors";
import { IChat, ISingleChat } from "@/types/chat.types";

export const ChatService = {
  async getAll() {
    return axios.get<IChat[]>(getChatsUrl(""));
  },
  async getById(id: string) {
    return axios.get<ISingleChat>(getChatsUrl(`/${id}`));
  },
  async create(userId: string) {
    return axios.post<IChat>(getChatsUrl(`/${userId}`),);
  },
};
