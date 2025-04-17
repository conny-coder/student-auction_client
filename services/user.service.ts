import { getUsersUrl } from "@/config/api.config";
import axios from "@/api/interceptors";
import { IUser } from "@/types/user.types";

export const UserService = {
  async getById(id: string) {
    return axios.get<IUser>(getUsersUrl(`/${id}`));
  },
};
