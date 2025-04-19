import { getUsersUrl } from "@/config/api.config";
import axios from "@/api/interceptors";
import { IUserState } from "@/types/user.types";

export const UserService = {
  async getById(id: string) {
    return axios.get<IUserState>(getUsersUrl(`/${id}`));
  },
  async getTopSellers() {
    return axios.get<Pick<IUserState, "name" | "avatar" | "_id">[]>(getUsersUrl("/top-sellers"));
  }
};
